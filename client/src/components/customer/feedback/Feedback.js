import './Feedback.css'
// import '../home/customerHome.css'
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

    //const firstWaitingIndex = tickets.data.findIndex(ticket =>ticket.status =='waiting')
    const currentTicketIndex = tickets.data.findIndex(ticket =>ticket.ticketId == ticketId)
    const ticketsInFrontOfMe = tickets.data.slice(0,currentTicketIndex)
    const peopleWaitingD = ticketsInFrontOfMe.filter(t=>t.status=='waiting').length
    //console.log(peopleWaitingD,'peopleWaitingD');
    //const ticket = tickets.data[currentTicketIndex];

    setTickets(tickets.data)
    setPeopleWaiting(peopleWaitingD)
    setTicket(ticket)
    //console.log(tickets.data.length, currentTicketIndex, 'tickets');
  }
  const getBusiness = async ()=>{
    const business = await axios.get(`http://localhost:5001/api/business/${businessId}`)
    setBusiness(business.data);
  }
  
  const cancelTicket = async ()=>{
    await axios.put(`http://localhost:5001/api/tickets/${ticketId}`, {status:'cancelled'})
    console.log('clicked: ', ticket.status, 'ticketID:', ticket.ticketId)
    navigate(`/customer/home`);
  }
    
  useEffect (()=>{
    const getData = async ()=>{
      await getBusiness()
      setInterval(async()=> await getTickets(),1000)
      //await getTickets();
      //console.log('ticket in useEffect:',ticket);
    }
    getData();
  },[])
  
  const showNext = peopleWaiting>0 ? <h4>There are <h2 className='queue-number'>{peopleWaiting}</h2> tables in front of you</h4>
                                   : <h4>Your ticket has been called. Go to the restaurant now.</h4>
                                   
  return (
    <div className='ticket'>
        {ticketId ?  (<div className='ticket__number-container'>
            <h4 className="ticket__number-info">Hi <h4> { ticket.name }</h4>, your ticket number is :</h4>
            <h1 className='ticket__number'> {ticketId}</h1>
        </div>) : <h1></h1>}
        <h3 className='ticket__status'> Your status :</h3>
        <h2 className='ticket__status status'> {ticket.status} </h2>
        {ticket.status == 'called' ?  (<div className='ticket__status'>
            <h4 className="called">Head to the restaurant! <h4> { ticket.name }</h4></h4>
        </div>) : <h4>hold your horses</h4>}
        <div className='info-container'>
        
        {business ?  (<div className='ticket__name-container'>
                        <h4 className='ticket__info'>Restaurant name:</h4><h4 className='ticket__name'> {business.name}</h4>
        </div>) : <h1>Business does not exist</h1>}
        <div className='queue-info-container'>{showNext}</div>
        {/* {calledTicketId ?  <h4 className='ticket__info'>Next is: {nextIs}</h4> :  <h1>Available!</h1>} */}
        </div>
        <div className='ticket__queue-info'>
        <button className='button button--cancel' onClick={cancelTicket}>Leave the queue</button>
        </div>

    </div>
  )
  /*{firstInLine ? <h1>First in line : {firstInLine}</h1> : null}
      {calledTicketId.status == 'waiting' ? <h1> Please be patient. Number of people in front: ## </h1> : null }
      {calledTicketId.status == 'called' ? <h1> Hey it's your turn. Move your ass!</h1> : <p>Your ticket will be called soon</p>}
*/
}
export default Feedback