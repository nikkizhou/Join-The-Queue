import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import axios from 'axios'

//businessId
function TicketList({businessData}) {
  let { businessId } = useParams();
  const [tickets, setTickets] = useState(null)
  const [calledTicketId, setcalledTicketId] = useState(null)
  

  const getTickets = async ()=>{
    const tickets = await axios.get(`http://localhost:5001/api/tickets/business/${businessId}`);
    setTickets(tickets.data)
    
    const calledTicketIndex = tickets.data.findIndex(ticket =>ticket.status === 'called')
    const calledTicket = tickets.data[calledTicketIndex]
    calledTicketIndex>=0 && setcalledTicketId(calledTicket.ticketId)
    // console.log(calledTicketIndex,'calledTicketIndex');
    // console.log(tickets.data,'tickets.data');
    // console.log(calledTicket,'calledTicket');
  }

  useEffect(()=>{
    getTickets()
    //setInterval(async()=> await getTickets(),1000)
  },[])

  const callNextClient = async ()=>{
    let nextTicketId;
    const nextTicketIndex = tickets.findIndex(t=>t.ticketId==calledTicketId)+1
    console.log(nextTicketIndex,'nextTicketIndex');
   
    if (nextTicketIndex<tickets.length) {
      nextTicketId = tickets[nextTicketIndex].ticketId;
      console.log(nextTicketId,'nextTicketId');
    }else{
      console.log('no more ticket to call!!');
    }
    
     // if there is a person who was called we find them and set them to DONE
     if (calledTicketId >=1){
       await axios.put(`http://localhost:5001/api/tickets/${calledTicketId}`,{status:'done'})
       await axios.put(`http://localhost:5001/api/tickets/${nextTicket.ticketId}`,{status:'called'})
       
       
    // if not we dont do anythign as its FIRST PERSON 
     }else{
       await axios.put(`http://localhost:5001/api/tickets/1`,{status:'called'})
     }
  }

  return (
    <div>
      <h1> Queue for today</h1> 
      <div className="tickets__container">
        {tickets && tickets.map(ticket => {
          return (
            <div  className="single__ticket" key={ticket.ticketId}>
              <h3> Ticket number : {ticket.ticketId}</h3>
              <p> Status : {ticket.status}</p>
            </div>
          )
        })}
      </div> 

      <button onClick={callNextClient}>Call next customer </button> 

    </div>
  )
}

export default TicketList