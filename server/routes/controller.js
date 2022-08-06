import axios from 'axios'
import { connectToDatabase } from "../mongodb.js";

const dbQuery = async (callback) => {
  const { database } = await connectToDatabase();
  const businessCol = await database.collection('restaurants')
  const ticketsCol = await database.collection('tickets')
  const usersCol = await database.collection('users')
  const result = { businessCol, ticketsCol, usersCol }
  return callback(result)
}

const getTickets = async (req, res) => {
  await dbQuery(async result => {
    const tickets = await result.ticketsCol.find({}).toArray()
    if (tickets) return res.status(200).send(tickets)
    return res.status(404).json({ success: false, msg: `Can't find tickets` });
  })
}

const getTicketById = async (req, res) => {
  const { id } = req.params;
  await dbQuery(async result => {
    const getOneTicket = async id => await result.ticketsCol.findOne({ ticketId: Number(id) })
    const ticket = await getOneTicket(id)
    if (ticket) return res.status(200).json(ticket);
    return res.status(404).json({ success: false, msg: `No ticket found with id:${id}` });
  })
}

const getTicketsByBusinessId = async (req, res) => {
  const { id } = req.params;
  await dbQuery(async result => {
    const getTickets = async id => await result.ticketsCol.find({ resId: Number(id) }).toArray()
    const tickets = await getTickets(id)
    if (tickets) return res.status(200).json(tickets);
    return res.status(404).json({ success: false, msg: `No tickets found with busines id:${id}` });
  })
}

const addOneTicket = async (req, res) => {
  await dbQuery(async result => {
    const tickets = await result.ticketsCol.find({}).toArray()
    const ticketId = tickets[tickets.length - 1].ticketId + 1
    const newTicket = { ...req.body, ticketId };
    if (req.body) await result.ticketsCol.insertOne(newTicket)
    res.status(200).json(newTicket)
  })
}

const deleteTicket = async (req, res) => {
  await dbQuery(async result => {
    const { id } = req.params;
    await result.ticketsCol.deleteOne({ ticketId: Number(id) })
    res.status(200).json({ message: `ticket with id ${id} deleted` })
  })
}

const getBusiness = async (req, res) => {
  await dbQuery(async result => {
    const business = await result.businessCol.find().toArray();
    if (business) return res.status(200).json(business)
    return res.status(404).json({ success: false, msg: `Can't find business` });
  })
}

const getBusinessById = async (req, res) => {
  const { id } = req.params;
  await dbQuery(async result => {
    const getOneBiz = async id => await result.businessCol.findOne({ id: Number(id) });
    const biz = await getOneBiz(id)
    if (biz) return res.status(200).json(biz);
    return res.status(404).json({ success: false, msg: `No busines with id:${id}` });
  })
}

const addOneBusiness = async (req, res) => {
  await dbQuery(async result => {
    const business = await result.businessCol.find({}).toArray()
    const businessId = business.length + 1
    const newBusiness = { ...req.body, businessId };
    if (req.body) await result.businessCol.insertOne(newBusiness)
    res.status(200).json(newBusiness)
  })
}

const updateTicketStatusInDB = async (id, status) => {
  return await dbQuery(async result => {
    const updateDoc = { $set: { status: status } };
    const ticketResult = await result.ticketsCol.findOneAndUpdate({ ticketId: id }, updateDoc, { 'returnNewDocument': true })
    return ticketResult.value
  })
}

const updateTicketStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const ticket = await updateTicketStatusInDB(Number(id), status)
  return res.status(200).json(ticket);
}

// const getGooglePhotoSrc = async (googlePhotoRef)=>{
//     const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${googlePhotoRef}&key=${process.env.GOOGLEMAP_API}`
//     const raw = await axios
//       .get(url, {
//         responseType: 'arraybuffer'
//       })
//     let base64 = Buffer.from(raw.data, "binary").toString("base64");
//     let imgSrc = `data:${raw.headers["content-type"]};base64,${base64}`;
//     return imgSrc
// }

const fetchDataFromGoogle = async (req, res) => {
  let { name } = req.params;
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry%2Cphotos&input=${name}&inputtype=textquery&key=${process.env.GOOGLEMAP_API}`
  const data = await axios.get(url)
  const candidates = data.data.candidates;

  // const getData = async () => {
  //   return Promise.all(candidates.map(biz => {
  //     if (biz.photos) {
  //         return getGooglePhotoSrc(biz.photos[0].photo_reference)
  //             .then(imgSrc=> {
  //                 biz.photos = imgSrc
  //                 return biz})
  //             .then(biz=> biz)
  //             .catch(e=>
  //             }
  //     //
  //   }))
  // }
  res.json(candidates);
}

const setToWaiting = async (req, res) => {
  await dbQuery(async result => {
    res.status(200).send(`All status set to waiting!`)
    return await result.ticketsCol.updateMany({ status: { $ne: 'waiting' } }, { $set: { status: 'waiting' } })
  })
}

const updateUserInfo = async (req, res) => {
  const { email } = req.params
  const { businessId } = req.body
  await dbQuery(async result => {
    res.status(200).send(`BusinessId ${businessId} set to user ${email}`)
    const userResult = await result.usersCol.findOneAndUpdate({ email }, { $set: { businessId } }, { 'returnNewDocument': true })
    return userResult.value
  })
}

const getUserByEmail = async (req, res) => {
  const { email } = req.params
  await dbQuery(async result => {
    const getUser = async email => await result.usersCol.findOne({ email });
    const user = await getUser(email)
    if (user) return res.status(200).json(user);
    return res.status(404).json({ success: false, msg: `No User with email:${email}` });
  })
}

export {
  getTickets, getTicketsByBusinessId, getTicketById, addOneTicket, updateTicketStatus, deleteTicket,
  getBusiness, getBusinessById, addOneBusiness,
  fetchDataFromGoogle, setToWaiting,
  updateUserInfo, getUserByEmail
}
