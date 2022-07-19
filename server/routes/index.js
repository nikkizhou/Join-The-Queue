
import express from "express"
import { connectToDatabase } from "../mongodb.js";
// import runChangeStream from '../changeStream.js'
var router = express.Router();

const {database,mongoClient}  = await connectToDatabase();
const business = await database.collection('restaurants').find({}).toArray();
const tickets = await database.collection('tickets').find({}).toArray();

// runChangeStream(database,mongoClient).catch(console.dir);


const nextBusinessId = business.length+1;
console.log(nextBusinessId,'nextBusinessId in backend!');
const nextTicketId = tickets.length+1;
console.log(nextTicketId,'nextBusinessId  in backend!');


const getTickets = (req,res) => {
    if (tickets) return res.status(200).send(tickets)
    return res.status(404).json({ success: false, msg: `Can't find tickets` });
}

const getTicketsById = (req,res) => {
    const { id } = req.params;
    const singleTicket = id => tickets.find(ticket => ticket.ticketId == id);
    if (singleTicket(id)) return res.status(200).json(singleTicket(id));
    return res.status(404).json({ success: false, msg: `no ticket with id:${id}` });
}

const addOneTicket = (req,res)=>{
    const newTicket = {...req.body, ticketId: nextTicketId};
    if (req.body) database.collection('tickets').insertOne(newTicket);
    res.status(200).json(newTicket)
}

const getBusiness = (req,res) => {
    //console.log(business);
    if (business) return res.status(200).send(business)
    return res.status(404).json({ success: false, msg: `Can't find business` });
}

const getBusinessByName = (req,res) => {
    const name  = req.params.name.toLowerCase();
    const singleBusiness = name => business.find(busines => busines.name.toLowerCase() === name);
    if (singleBusiness(name))  return res.status(200).json(singleBusiness(name));
    return res.status(404).json({ success: false, msg: `No busines with name:${name}` });
}

const getBusinessById = (req,res) => {
    const {id}  = req.params;
    const singleBusiness = id => business.find(business => business.id == id);
    if (singleBusiness(id))  return res.status(200).json(singleBusiness(id));
    return res.status(404).json({ success: false, msg: `No busines with id:${id}` });
}

const getTicketsByBusinessId = (req,res) => {
    const {id}  = req.params;
    const singleTicket = id => tickets.filter(ticket => ticket.resId == id);
    if (singleTicket(id))  return res.status(200).json(singleTicket(id));
    return res.status(404).json({ success: false, msg: `No busines with id:${id}` });
}

const addOneBusiness = (req,res)=>{
    const newBusiness = req.body;
    //res.send(newBusiness);
    if (newBusiness) {
      database.collection('restaurants').insertOne({...newBusiness, id:nextBusinessId});
      console.log({...newBusiness, id:nextBusinessId},'');
      res.status(200).json({success: true, msg: `Business added to database!` })
    }
}

router.get('/tickets', getTickets)
router.get('/tickets/business/:id',getTicketsByBusinessId)
router.get('/tickets/:id', getTicketsById)
router.post('/tickets', addOneTicket)

router.get('/business', getBusiness)
router.get('/business/name/:name', getBusinessByName)
router.get('/business/:id', getBusinessById)
router.post('/business', addOneBusiness)
//router.put('/tickets/:id', changeTicketStatus)

export default router