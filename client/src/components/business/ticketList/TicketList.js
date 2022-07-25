import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import axios from 'axios'
import ClockLoader from "react-spinners/ClockLoader";
import './TicketList.css'

//businessId
function TicketList() {
  let { businessId } = useParams();
  const [tickets, setTickets] = useState(null)
  const [calledTicketId, setcalledTicketId] = useState(null)
  const [ticketId, setTicketId] = useState(null)
  console.log(tickets,'tickets in TicketList component');


  const [waiting, setWaitingTickets] = useState(0)
  const [done, setDoneTickets] = useState(0)
  const [cancelled, setCancelledTickets] = useState(0)
  const [loading, isLoading] = useState(true)
  const override =  {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "45%",
    margin: "0 auto",
    borderColor: "red",
  };

  const getTickets = async ()=>{
    const tickets = await axios.get(`http://localhost:5001/api/tickets/business/${businessId}`);
   
    setTickets(tickets.data)

    const waitingTickets = tickets.data?.filter(ticket => ticket.status === 'waiting')
    const doneTickets = tickets.data?.filter(ticket => ticket.status === 'done')
    const cancelledTickets = tickets.data?.filter(ticket => ticket.status === 'cancelled')

    setWaitingTickets(waitingTickets.length)
    setDoneTickets(doneTickets.length)
    setCancelledTickets(cancelledTickets.length)


    const calledTicketIndex = tickets.data.findIndex(ticket =>ticket.status === 'called')
    const calledTicket = tickets.data[calledTicketIndex]
    calledTicketIndex>=0 && setcalledTicketId(calledTicket.ticketId)
    isLoading(false)

  }
  useEffect(()=>{
    setInterval(async()=> await getTickets(),1000)
  },[])

  

  const handleClick =  async (event) => {
    const id = event.currentTarget.id
    const status= tickets.find(ticket => ticket.ticketId == id).status
    console.log(status)
    if(status === 'waiting'){
      await axios.put(`http://localhost:5001/api/tickets/${id}`,{status:'called'})}
    else if(status === 'called'){
      await axios.put(`http://localhost:5001/api/tickets/${id}`,{status:'done'})}
  }
  const handleCancel =  async (event) => {
    const id = event.currentTarget.id
    const status= tickets.find(ticket => ticket.ticketId == id).status
    if(status === 'called'){
     await axios.put(`http://localhost:5001/api/tickets/${id}`,{status:'cancelled'})}
    // else if(status === 'cancelled'){
    //   await axios.put(`http://localhost:5001/api/tickets/${id}`,{status:'called'})}
    
    }

  // if(!tickets||tickets.length==0) return (<h1>No Queue Yet</h1>) 

  
  
  return (
    <div>
        
        {loading ? <ClockLoader color={'#4A90E2'} loading={loading} size={100} cssOverride={override}/> : 
        
        <>
          {!tickets||tickets.length==0 ? <h1>No Queue Yet</h1> : 
          
          
          <>
          
          <h1 className='queue__header'> Your Queue: </h1>
        <header className='ticketlist--display'>
          <p className='ticketlist--display_sticky'> waiting :  {waiting}</p>
          <p className='ticketlist--display_sticky'> done : {done}</p>
          <p className='ticketlist--display_sticky'> cancelled : {cancelled}</p>
        </header>
        <div className="list__container">
          {tickets && tickets.filter(ticket =>{
            return ticket.status === 'waiting' || ticket.status === 'called'
          }).map(ticket => {
            return (
              <div  className="card queue-info-card" key={ticket.ticketId}>
                <div className='row'>
                  <div className='column column-your-queue-ticket-number'>
                    <h3 className='text'> Ticket number :</h3> <h3 className='text your-queue-number-text'> {ticket.ticketId}</h3>
                  </div>
                  <div className="column column--your-queue-status">
                    <p className='text'> Status : </p>
                    <p className={`colored-text-box ${ticket.status == 'called' ? "colored-text-box--green" : "colored-text-box--grey"}`}>{ticket.status}</p>
                  </div>
                </div>
                <div className='row'>
                  <button  className='button ' id={ticket.ticketId} status={ticket.status} onClick={handleClick}>
                    {ticket.status === 'waiting' ? 'Call' :  'Arrived' || ticket.status==='called' ? 'Confrim Arrival' : null}
                  </button>
                  {ticket.status === 'called' || ticket.status ==='cancelled' ?
                  <button className='button button--cancel'id={ticket.ticketId} onClick={handleCancel}>Cancel</button>
                  : null}
                </div>
              </div>
            )
          })}
        </div>
        </>
        
      }
          
          </>}

      </div>
    )
  }
  export default TicketList
  