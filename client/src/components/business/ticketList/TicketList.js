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
    const tickets = await axios.get(`/api/tickets/business/${businessId}`);
   
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
    
    if(status === 'waiting'){
      await axios.put(`/api/tickets/${id}`,{status:'called'})}
    else if(status === 'called'){
      await axios.put(`/api/tickets/${id}`,{status:'done'})}
  }
  const handleCancel =  async (event) => {
    const id = event.currentTarget.id
    const status= tickets.find(ticket => ticket.ticketId == id).status
    if(status === 'called'){
     await axios.put(`/api/tickets/${id}`,{status:'cancelled'})}
    // else if(status === 'cancelled'){
    //   await axios.put(`/api/tickets/${id}`,{status:'called'})}
    
    }

  // if(!tickets||tickets.length==0) return (<h1>No Queue Yet</h1>) 

  
  
  return (
    <div>
       {loading ? <ClockLoader color={'#4A90E2'} loading={loading} size={100} cssOverride={override}/> : 
        <>
          {!tickets||tickets.length==0 ? <h3>No Queue Yet</h3> : 
           <>
           <div className="ticketlist--display">
              <h3 className="ticketList--Heading"> Your Queue </h3>
              <div className='stat-wrapper'>
                <div className="ticketList--stat ticketlist-waiting"> <strong>Waiting :</strong>  {waiting}</div>
                <div className="ticketList--stat ticketlist-done"> <strong> Done : </strong> {done}</div>
                <div className="ticketList--stat ticketlist-cancelled"> <strong> Cancelled : </strong> {cancelled}</div>
              </div>
          </div>
        <div className="list__container">
          {tickets && tickets.filter(ticket =>{
            return ticket.status === 'waiting' || ticket.status === 'called'
          }).map(ticket => {
            return (
              <div  className="card queue-info-card" key={ticket.ticketId}>
                <div className='row'>
                  <div className='column column-your-queue-ticket-number'>
                    <h4 className='text'> Ticket number :</h4> <h4 className='text your-queue-number-text'> {ticket.ticketId}</h4>
                  </div>
                  <div className="column column--your-queue-status">
                    <p className='text'> Status : </p>
                    <p className={`colored-text-box ${ticket.status == 'called' ? "colored-text-box--green" : "colored-text-box--yellow"}`}>
                        {ticket.status}</p>
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
  