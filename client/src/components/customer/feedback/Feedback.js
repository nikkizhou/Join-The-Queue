import '../home/customer.css';
import React, { useEffect,useState } from 'react'
import axios from 'axios'
// import { Router } from 'react-router'
import { useSearchParams, useNavigate } from "react-router-dom";


function Feedback() {
  console.log('running Feedback!');
  let [searchParams, setSearchParams] = useSearchParams();
  const ticketId = searchParams.get('ticketId');
  const businessId =searchParams.get('businessId');
  const [tickets, setTickets] = useState(null);
  const [ticket, setTicket] = useState('ticket default');
  const [business,setBusiness] = useState(null);
  const [peopleWaiting,setPeopleWaiting] = useState(0);
  const navigate = useNavigate();

  const getTickets = async ()=>{
    const tickets = await axios.get(`http://localhost:5001/api/tickets/business/${businessId}`);
    const firstWaitingIndex = tickets.data.findIndex(ticket =>ticket.status =='waiting')
    const currentTicketIndex = tickets.data.findIndex(ticket =>ticket.ticketId ==ticketId)
    const ticket = tickets.data[currentTicketIndex];

    setTickets(tickets.data)
    setPeopleWaiting(currentTicketIndex - firstWaitingIndex)
    setTicket(ticket)
    //console.log(tickets.data.length, currentTicketIndex, 'tickets');
  }
  const getBusiness = async ()=>{
    const business = await axios.get(`http://localhost:5001/api/business/${businessId}`)
    setBusiness(business.data);
  }
  
  const cancelTicket = async ()=>{
    await axios.put(`http://localhost:5001/api/tickets/${ticketId}`,{status:'cancelled'})
    console.log('clicked: ', ticket.status)
    
    navigate(`/customer/home`);
  }
    
  useEffect (()=>{
    const getData = async ()=>{
      await getBusiness()
      //setInterval(async()=> await getTickets(),1000)
      await getTickets();
      //console.log('ticket in useEffect:',ticket);
    }
    getData();
    
  },[])
  
  const showNext = peopleWaiting>0 ? `There are ${peopleWaiting} people in front of you`
                                   : 'Your turn now!'
                                   
  return (
    <div className='ticket'>

        {business ?  (<div className='ticket__name-container'>
                        <h4 className='ticket__info'>In the queue for:</h4><h4 className='ticket__name'> {business.name}</h4>
        </div>) : <h1>Business does not exist</h1>}
        {ticketId ?  (<div className='ticket__number-container'>
            <h4 className="ticket__number-info">Hi <h2>{ ticket.name }</h2>, Your ticket number is :</h4>
            <h1 className='ticket__number'> {ticketId}</h1>
        </div>) : <h1>TicketId does not exist</h1>}
        <h3>{showNext}</h3>
        {/* {calledTicketId ?  <h4 className='ticket__info'>Next is: {nextIs}</h4> :  <h1>Available!</h1>} */}
        <div className='ticket__queue-info'>
        <button className='button button--cancel' onClick={cancelTicket}>Leave the queue</button>
        <p className='ticket__status'> Your status : {ticket.status}</p>
        </div>

    </div>
  )
  /*{firstInLine ? <h1>First in line : {firstInLine}</h1> : null}
      {calledTicketId.status == 'waiting' ? <h1> Please be patient. Number of people in front: ## </h1> : null }
      {calledTicketId.status == 'called' ? <h1> Hey it's your turn. Move your ass!</h1> : <p>Your ticket will be called soon</p>}
*/
}
export default Feedback