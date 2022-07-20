
import express from "express"
import { connectToDatabase } from "../mongodb.js";
// import runChangeStream from '../changeStream.js'
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
    //database.collection('tickets').remove({})
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
    const ticketId = tickets.tickets.length+1
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
    // await database.collection('restaurants').remove({})
    // await database.collection('restaurants').insertMany(obj)
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

const updateTicketStatus = async (req,res)=>{
    const { id } = req.params;
    const { status } = req.body;
    const result = await updateTicketStatusInDB(Number(id),status)
    const tickets = await dbQuery()
    const ticketDB = tickets.tickets
    const targetTicket = ticketDB.find(t=>t.ticketId == id)
    return res.status(200).json(targetTicket);
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
//router.put('/tickets/:id', changeTicketStatus)

export default router
