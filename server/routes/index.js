
import express from "express"
import { connectToDatabase } from "../mongodb.js";
// import runChangeStream from '../changeStream.js'
import axios from 'axios'

var router = express.Router();
const {database}  = await connectToDatabase();

const dbQuery = async ()=>{
  const {database}  = await connectToDatabase();
  const business = await database.collection('restaurants').find({}).toArray();
  const tickets = await database.collection('tickets').find({}).toArray();
  return {business,tickets}
}

// runChangeStream(database,mongoClient).catch(console.dir);
const getTickets = async (req,res) => {
    const tickets = await dbQuery()
    const ticketsDB = tickets.tickets
    
    if (tickets) return res.status(200).send(ticketsDB)
    return res.status(404).json({ success: false, msg: `Can't find tickets` });
}

const getTicketsById = async (req,res) => {
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
    //console.log(id,'id in deleteTicket');
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
    //console.log(filter)
    const updateDoc = {$set: {status: status}};
    return database.collection('tickets').findOneAndUpdate(filter,updateDoc,{'returnNewDocument' : true })
    // database.collection('tickets').update({"ticketId": id},{$set: {"status": status}})
}
//
const updateTicketStatus = async (req,res)=>{
    const { id } = req.params;
    const { status } = req.body;
    const result = await updateTicketStatusInDB(Number(id),status)
    const tickets = await dbQuery()
    const ticketDB = tickets.tickets
    const targetTicket = ticketDB.find(t=>t.ticketId == id)
    return res.status(200).json(targetTicket);
}

const getGooglePhotoSrc = async (googlePhotoRef)=>{
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${googlePhotoRef}&key=AIzaSyCWJ0GsY0BynFt81-H82ok6RqIsZilr768`
    const raw = await axios
      .get(url, {
        responseType: 'arraybuffer'
      })
    let base64 = Buffer.from(raw.data, "binary").toString("base64");
    let imgSrc = `data:${raw.headers["content-type"]};base64,${base64}`;
      
    return imgSrc
}


const fetchDataFromGoogle = async (req,res)=>{
    //console.log(process.env.GOOGLE_API_KEY,'process.env.GOOGLE_API_KEY');
    let {name} = req.params;

    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry%2Cphotos&input=${name}&inputtype=textquery&key=AIzaSyCWJ0GsY0BynFt81-H82ok6RqIsZilr768`
    const data = await axios.get(url)
    const candidates = data.data.candidates;
    console.log(candidates,'-candidates in fetchDataFromGoogle');

    const getData = async () => {
      return Promise.all(candidates.map(biz => {
        if (biz.photos) {
            return getGooglePhotoSrc(biz.photos[0].photo_reference)
                .then(imgSrc=> {
                    biz.photos = imgSrc
                    return biz
                })
                .then(biz=> biz)
                .catch(e=>console.log(e))
                }
        //console.log(('imgSrc in map: ',imgSrc));
      }))
    }
    const newData = await getData();
    res.json(newData);
}

const setToWaiting = async (req, res) => {
   // await axios.put()
   const {database}  = await connectToDatabase();
   res.status(200).send(`All status set to waiting!`)
   return database.collection('tickets').updateMany({status:{$in: ['called','arrived','cancelled']}},{$set: {status:'waiting'}})
}  

const updateUserInfo = async (req, res) => {
    const {database}  = await connectToDatabase();
    const {email} = req.params
    const {businessId} = req.body
    const filter = {email}
    //console.log(filter)
    const updateDoc = {$set: {businessId}};
    res.status(200).send(`BusinessId ${businessId} set to user ${email}`)
    return database.collection('restaurants').findOneAndUpdate(filter,updateDoc,{'returnNewDocument' : true })
    // database.collection('tickets').update({"ticketId": id},{$set: {"status": status}})
}

const getUserInfo = async (req,res) => {
  const {business} = await dbQuery()
  const {email} = req.params
  const singleUser = email => business.find(business => business.email == email);
  if (singleUser(email))  return res.status(200).json(singleUser(email));
  return res.status(404).json({ success: false, msg: `No User with email:${email}` });
}





router.get('/tickets', getTickets)
router.get('/tickets/business/:id',getTicketsByBusinessId)
router.get('/tickets/:id', getTicketsById)
router.post('/tickets', addOneTicket)
router.put('/tickets/:id', updateTicketStatus)
router.delete('/tickets/:id', deleteTicket)

router.get('/business', getBusiness)
router.get('/business/name/:name', getBusinessByName)
router.get('/business/:id', getBusinessById)
router.post('/business', addOneBusiness)
router.get('/getGoogleData/:name',fetchDataFromGoogle)
//router.put('/tickets/:id', changeTicketStatus)
router.get('/setToWaiting', setToWaiting)

router.put('/user/:email', updateUserInfo)
router.get('/user/:email', getUserInfo)

export default router

const resObj = 
[
    {
    "_id": "62d40afcd7ef63b2ab100e20",
    "name": "Eat east",
    "imge": "https://portalrestaurant.se/ny/wp-content/uploads/2020/01/toppbild-om-oss-portal.jpg",
    "description": "Best Chinese restaurant in Stockholm",
    "website": "https://www.eateast.se/",
    "id": "1",
    "address": "bromma vei 22"
    },
    {
    "_id": "62d40cd6d7ef63b2ab100e21",
    "name": "Pelikan",
    "imge": "https://thatsup.website/storage/123/4743/responsive-images/FUJI6325___media_library_original_1048_698.jpg",
    "description": "this is a place where we worship swedish cuisine. this is a place where we worship the cream sauce, the browned butter and herring. everything that over the years has become a swedish tradition",
    "website": "https://pelikan.se/en",
    "id": "2",
    "address": "stockholm street 45"
    },
    {
    "_id": "62d5250422faa67e40063c02",
    "name": "Pelikan3",
    "imge": "https://portalrestaurant.se/ny/wp-content/uploads/2020/01/toppbild-om-oss-portal.jpg",
    "description": "this is a place where we worship swedish cuisine. this is a place where we worship the cream sauce, the browned butter and herring. everything that over the years has become a swedish tradition",
    "website": "https://pelikan.se/en",
    "id": "3",
    "address": "oslo vei 33"
    },
    {
    "_id": "62d5251722faa67e40063c03",
    "name": "Pelikan4",
    "imge": "https://portalrestaurant.se/ny/wp-content/uploads/2020/01/toppbild-om-oss-portal.jpg",
    "description": "this is a place where we worship swedish cuisine. this is a place where we worship the cream sauce, the browned butter and herring. everything that over the years has become a swedish tradition",
    "website": "https://pelikan.se/en",
    "id": "4",
    "address": "ski vei 34"
    }
]

const ticketObj = [
{
    "_id": "62d699d104f61289ffc0f055",
    "resId": "4",
    "status": "cancelled",
    "customerId": "79cf2d6e-6caf-4af5-a780-14472f23e5ce",
    "ticketId": 1
    },
    {
    "_id": "62d699e604f61289ffc0f056",
    "resId": "4",
    "status": "called",
    "customerId": "c9f412dc-d708-430d-9e22-18c6555c3029",
    "ticketId": 2
    },
    {
    "_id": "62d699eb04f61289ffc0f057",
    "resId": "4",
    "status": "done",
    "customerId": "a33af419-e76b-42de-92ea-4f788f2f64e8",
    "ticketId": 3
    },
    {
    "_id": "62d699f204f61289ffc0f058",
    "resId": "4",
    "status": "done",
    "customerId": "46188a28-3236-4c20-b737-4e112a79bf15",
    "ticketId": 4
    },
    {
    "_id": "62d69af82b992e862543b8e4",
    "resId": "4",
    "status": "done",
    "customerId": "fb3c2342-1693-4a1e-aaa7-e8678e618f41",
    "ticketId": 5
    },
    {
    "_id": "62d69bc359688d91a1ae25c7",
    "resId": "1",
    "status": "cancelled",
    "customerId": "afa2c400-4d8b-4362-8fb4-db8f53dff835",
    "ticketId": 6
    },
    {
    "_id": "62d6be4b0a51acc7173406b9",
    "resId": "4",
    "status": "done",
    "customerId": "53be83b5-64cc-47f9-904e-f7e964c84a75",
    "ticketId": 7
    },
    {
    "_id": "62d6be510a51acc7173406ba",
    "resId": "4",
    "status": "called",
    "customerId": "2b8b6962-f26c-49cf-96f6-11179dcdc98c",
    "ticketId": 8
    },
    {
    "_id": "62d6c4847cd123622ca4e479",
    "resId": "1",
    "status": "called",
    "customerId": "e95bfb6a-3398-447d-90fd-f799fbe67c36",
    "ticketId": 9
    },
    {
    "_id": "62d7bee32f79f3fd1a0445c8",
    "resId": "1",
    "status": "cancelled",
    "customerId": "8087446d-de32-4f62-a205-f92eef04cb73",
    "ticketId": 12
    },
    {
    "_id": "62d7c2d723e9010414b806e8",
    "resId": "1",
    "status": "arrived",
    "customerId": "c0dd0ad8-eb29-4a92-96a6-32ab2fbbd08f",
    "ticketId": 13
    },
    {
    "_id": "62d7d69a23e9010414b806e9",
    "resId": "2",
    "status": "arrived",
    "customerId": "e64b1315-a02f-4620-841c-d61051d08f09",
    "ticketId": 14
    },
    {
    "_id": "62d7dde123e9010414b806ea",
    "resId": "2",
    "status": "cancelled",
    "customerId": "4802515e-79ca-4154-a71d-3ec8f11ab635",
    "ticketId": 15
    },
    {
    "_id": "62d7e2e523e9010414b806eb",
    "resId": "1",
    "status": "arrived",
    "customerId": "7ce025bd-8cee-4ad7-b1ce-29e6ff66aef7",
    "ticketId": 16
    },
    {
    "_id": "62d7e6954421961bd2d36fdf",
    "resId": "3",
    "status": "called",
    "ticketId": 17
    },
    {
    "_id": "62d7e6984421961bd2d36fe0",
    "resId": "1",
    "status": "arrived",
    "customerId": "b46fcaf8-a6dd-481b-b561-64fa06ce07d9",
    "ticketId": 18
    },
    {
    "_id": "62d7e6a94421961bd2d36fe1",
    "resId": "2",
    "status": "cancelled",
    "ticketId": 19
    },
    {
    "_id": "62d7e6ae4421961bd2d36fe2",
    "resId": "4",
    "status": "called",
    "ticketId": 20
    },
    {
    "_id": "62d7f04a23e9010414b806ec",
    "resId": "2",
    "status": "arrived",
    "customerId": "00f58d0e-0753-4fd3-91b2-61df0412e95c",
    "ticketId": 21
    },
    {
    "_id": "62d7f05e23e9010414b806ed",
    "resId": "2",
    "status": "arrived",
    "customerId": "78818d3c-53f1-4171-88b2-ab257bceb5d9",
    "ticketId": 22
    },
    {
    "_id": "62d7f52a23e9010414b806ee",
    "resId": "2",
    "status": "cancelled",
    "customerId": "e47d702b-64ee-44c1-8095-621d5b134969",
    "ticketId": 23
    },
    {
    "_id": "62d7f79423e9010414b806ef",
    "resId": "1",
    "status": "called",
    "customerId": "1c6e78cc-2cf4-4654-9691-dd22f9140ece",
    "ticketId": 24
    },
    {
    "_id": "62d7fa87cdcd6cf41b2fb4cf",
    "resId": "1",
    "status": "called",
    "customerId": "0b7c3c75-d6a3-4dbc-a0ea-eeedc96af326",
    "ticketId": 25
    },
    {
    "_id": "62d7fe5d23e9010414b806f0",
    "resId": "2",
    "status": "cancelled",
    "customerId": "6918df07-3e91-429b-99c4-02001e504cb0",
    "ticketId": 26
    }]



    // await database.collection('tickets').remove({})
    // await database.collection('tickets').insertMany(ticketObj)

    //await database.collection('restaurants').remove({})
    // await database.collection('restaurants').insertMany(resObj)