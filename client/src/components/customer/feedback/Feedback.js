import React, { useEffect,useState } from 'react'
import axios from 'axios'
// import { Router } from 'react-router'
import { useSearchParams } from "react-router-dom";

function Feedback() {
  let [searchParams, setSearchParams] = useSearchParams();
  const ticketId = searchParams.get('ticketId');
  const businessId =searchParams.get('businessId');

  // const [tickets,setTickets] = useState(null);
   const [business,setBusiness] = useState(null);
  const [calledTicketId,setCalledTicketId] = useState('Waiting for data');
  
  const getTickets = async ()=>{
    const tickets = await axios.get(`http://localhost:5001/api/tickets/business/${businessId}`);
    const index = tickets.data.findIndex(ticket => ticket.status == 'called')
    index>=0 && setCalledTicketId(tickets.data[index].ticketId);
    console.log(calledTicketId,'--calledTicketId!!!');
    console.log(tickets.data,'tickets'); 
  } 

  const getBusiness = async ()=>{
    const business = await axios.get(`http://localhost:5001/api/business/${businessId}`)
    setBusiness(business.data);
  }

  const cancelTicket = async ()=>{
    let tickets = await axios.get(`http://localhost:5001/api/tickets/business/${businessId}`);
    tickets = tickets.data
    const index = tickets.data.findIndex(ticket => ticket.ticketId == ticketId);
    tickets.splice(index,1);
    
  }

  useEffect (()=>{
    const getData = async ()=>{
      await getBusiness()
      //setInterval(async()=> await getTickets(),1000)
      await getTickets();
    }
    getData();
  },[])

//console.log(ticket.status);
  const nextIs = calledTicketId==ticketId ? 'Your turn!': calledTicketId
  return (
    <div className='ticket'>
      {ticketId ?  <h1 className='ticket__id'>Your ticket number is :  {ticketId}</h1> : <h1>TicketId does not exist</h1>}
      {calledTicketId ?  <h1 className='ticket__informed'>Next is: {nextIs}</h1> :  <h1>Available!</h1>}
      {business ?  <h1 className='ticket__business-name'>Business Name: {business.name}</h1> : <h1>Business does not exist</h1>}
      {/* {queue ? <h1> {queue}</h1> : null} */}
      <button className='button button--cancel' onClick={cancelTicket}>Cancel</button>
    </div>
  )
}

export default Feedback