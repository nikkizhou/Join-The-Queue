
import axios from 'axios'
import express from "express"
import { connectToDatabase } from "../mongodb.js";
import { resObj, ticketsObj } from './mockData.js';

var router = express.Router();

const dbQuery = async (callback) => {
  const {database}  = await connectToDatabase();
  const business = await database.collection('restaurants').find({}).toArray();
  const tickets = await database.collection('tickets').find({}).toArray();
  const users = await database.collection('users').find({}).toArray();
  const result = { database, business, tickets, users }
  return callback(result)
}

const getTickets = async (req,res) => {
    await dbQuery(result => {
        if (result.tickets) return res.status(200).send(result.tickets)
        return res.status(404).json({ success: false, msg: `Can't find tickets` });
    })
}

const getTicketById = async (req,res) => {
    const tickets = await dbQuery()
    const ticketsDB = tickets.tickets
    const { id } = req.params;
    const singleTicket = id => ticketsDB.find(ticket => ticket.ticketId == id);
    if (singleTicket(id)) return res.status(200).json(singleTicket(id));
    return res.status(404).json({ success: false, msg: `no ticket with id:${id}` });
}

const getTicketsByBusinessId = async (req,res) => {
    const tickets = await dbQuery()
    const ticketDB = tickets.tickets
    const {id}  = req.params;

    const allTickets = id => ticketDB.filter(ticket => ticket.resId == id);
    if (allTickets(id))  return res.status(200).json(allTickets(id));
    return res.status(404).json({ success: false, msg: `No busines with id:${id}` });
}

const addOneTicket = async (req,res)=>{
    const {database}  = await connectToDatabase();
    const tickets = await dbQuery();
    const ticketsDB = tickets.tickets
    let ticketId = ticketsDB[ticketsDB.length-1].ticketId+1
    
    const newTicket = {...req.body, ticketId};
    if (req.body)  await database.collection('tickets').insertOne(newTicket)
    res.status(200).json(newTicket)
}

const deleteTicket = async (req,res)=>{
    const {database}  = await connectToDatabase();
    const {id}  = req.params;
    await database.collection('tickets').deleteOne({ticketId:Number(id)})
    res.status(200).json({message:`ticket with id ${id} document deleted`})
}

const getBusiness = async (req,res) => {
    const business = await dbQuery()
    const businessDB = business.business
    if (business) return res.status(200).json(businessDB)
    return res.status(404).json({ success: false, msg: `Can't find business` });
}

const getBusinessByName = async (req,res) => {
    const business = await dbQuery()
    const businessDB = business.business
    const name  = req.params.name.toLowerCase();
    const singleBusiness = name => businessDB.find(busines => busines.name.toLowerCase() === name);
    if (singleBusiness(name))  return res.status(200).json(singleBusiness(name));
    return res.status(404).json({ success: false, msg: `No busines with name:${name}` });
}

const getBusinessById = async (req,res) => {
    const business = await dbQuery()
    const businessDB = business.business
    const {id}  = req.params;
    const singleBusiness = id => businessDB.find(business => business.id == id);
    if (singleBusiness(id))  return res.status(200).json(singleBusiness(id));
    return res.status(404).json({ success: false, msg: `No busines with id:${id}` });
}

const addOneBusiness = async (req,res)=>{
    const {database}  = await connectToDatabase();
    const business = await dbQuery()
    const businessId = business.business.length+1
      const newBusiness = {...req.body, id:businessId}
      if (req.body) await database.collection('restaurants').insertOne(newBusiness);
      res.status(200).json(newBusiness)
}

const updateTicketStatusInDB = async (id,status)=>{
    const {database}  = await connectToDatabase();
    const filter = {ticketId:id}
    const updateDoc = {$set: {status: status}};
    return database.collection('tickets').findOneAndUpdate(filter,updateDoc,{'returnNewDocument' : true })
}

const updateTicketStatus = async (req,res)=>{
    const { id } = req.params;
    const { status } = req.body;
    const result = await updateTicketStatusInDB(Number(id),status)
    const tickets = await dbQuery()
    const ticketDB = tickets.tickets
    const targetTicket = ticketDB.find(t=>t.ticketId == id)
    return res.status(200).json(targetTicket);
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


const fetchDataFromGoogle = async (req,res)=>{
    let {name} = req.params;

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
   const {database}  = await connectToDatabase();
   res.status(200).send(`All status set to waiting!`)
    return database.collection('tickets').updateMany({ status: { $ne:'waiting'} },{$set: {status:'waiting'}})
}  

const updateUserInfo = async (req, res) => {
    const {database}  = await connectToDatabase();
    const {email} = req.params
    const {businessId} = req.body
    const filter = {email}
    const updateDoc = {$set: {businessId}};
    res.status(200).send(`BusinessId ${businessId} set to user ${email}`)
    return database.collection('users').findOneAndUpdate(filter,updateDoc,{'returnNewDocument' : true })
}

const getUserInfo = async (req,res) => {
  const {users} = await dbQuery()
  const {email} = req.params
  const singleUser = email => users.find(user => user.email == email);
  if (singleUser(email))  return res.status(200).json(singleUser(email));
  return res.status(404).json({ success: false, msg: `No User with email:${email}` });
}

router.get('/tickets', getTickets)
router.get('/tickets/business/:id',getTicketsByBusinessId)
router.get('/tickets/:id', getTicketById)
router.post('/tickets', addOneTicket)
router.put('/tickets/:id', updateTicketStatus)
router.delete('/tickets/:id', deleteTicket)

router.get('/business', getBusiness)
router.get('/business/name/:name', getBusinessByName)
router.get('/business/:id', getBusinessById)
router.post('/business', addOneBusiness)
router.get('/getGoogleData/:name',fetchDataFromGoogle)
router.get('/setToWaiting', setToWaiting)

router.put('/user/:email', updateUserInfo)
router.get('/user/:email', getUserInfo)

export default router



//const { database } = await connectToDatabase();
// await database.collection('tickets').remove({})
// await database.collection('tickets').insertMany(ticketObj)

// await database.collection('restaurants').remove({})
// await database.collection('restaurants').insertMany(resObj)
