import { resObj, ticketsObj } from './mockData.js';
import express from "express"
import{
    getTickets, getTicketsByBusinessId, getTicketById, addOneTicket, updateTicketStatus, deleteTicket,
    getBusiness, getBusinessById, addOneBusiness,
    fetchDataFromGoogle, setToWaiting,
    updateUserInfo, getUserByEmail
} from './controller.js'

var router = express.Router();

router.get('/tickets', getTickets)
router.get('/tickets/business/:id',getTicketsByBusinessId)
router.get('/tickets/:id', getTicketById)
router.post('/tickets', addOneTicket)
router.put('/tickets/:id', updateTicketStatus)
router.delete('/tickets/:id', deleteTicket)

router.get('/business', getBusiness)
router.get('/business/:id', getBusinessById)
router.post('/business', addOneBusiness)

router.get('/getGoogleData/:name',fetchDataFromGoogle)
router.get('/setToWaiting', setToWaiting)

router.put('/user/:email', updateUserInfo)
router.get('/user/:email', getUserByEmail)

export default router



//const { database } = await connectToDatabase();
// await database.collection('tickets').remove({})
// await database.collection('tickets').insertMany(ticketObj)

// await database.collection('restaurants').remove({})
// await database.collection('restaurants').insertMany(resObj)
