import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import axios from 'axios'
//businessId
function TicketList({businessData}) {
  let { businessId } = useParams();
  const [tickets, setTickets] = useState(null)
  const [calledTicketId, setcalledTicketId] = useState(null)
  const [ticketId, setTicketId] = useState(null)
  console.log(tickets);
  const getTickets = async ()=>{
    const tickets = await axios.get(`http://localhost:5001/api/tickets/business/${businessId}`);
    console.log(tickets.data)
    setTickets(tickets.data)
    const calledTicketIndex = tickets.data.findIndex(ticket =>ticket.status === 'called')
    const calledTicket = tickets.data[calledTicketIndex]
    calledTicketIndex>=0 && setcalledTicketId(calledTicket.ticketId)
  }
  useEffect(()=>{
    getTickets()
    //setInterval(async()=> await getTickets(),1000)
  },[])
  // const toggleComplete = (id) => {
  //  todos.find((todo) => {
  //  if (todo.id === id) {
  //    todo.complete = !todo.complete;
  //  }
  //  return setTodos([...todos]);
  //  });
  // };
  const handleClick =  async (event) => {
    const id = event.currentTarget.id
    const status= tickets.find(ticket => ticket.ticketId == id).status
    console.log(status)
    if(status === 'waiting'){
    await axios.put(`http://localhost:5001/api/tickets/${id}`,{status:'called'})}
    else if(status === 'called'){
      await axios.put(`http://localhost:5001/api/tickets/${id}`,{status:'arrived'})}
    // const status2 = await (await axios.get(`http://localhost:5001/api/tickets/${id}`)).data.status
    // console.log(status)
    // await axios.put(`http://localhost:5001/api/tickets/${id}`,{status:'called'})
    // console.log(event.currentTarget.id, 'event.currentTarget.id');
  }
  const handleCancel =  async (event) => {
    const id = event.currentTarget.id
    const status= tickets.find(ticket => ticket.ticketId == id).status
    console.log(status)
    if(status === 'called'){
     await axios.put(`http://localhost:5001/api/tickets/${id}`,{status:'cancelled'})}
    else if(status === 'cancelled'){
      await axios.put(`http://localhost:5001/api/tickets/${id}`,{status:'called'})}
    // const status2 = await (await axios.get(`http://localhost:5001/api/tickets/${id}`)).data.status
    // console.log(status)
    // await axios.put(`http://localhost:5001/api/tickets/${id}`,{status:'called'})
    // console.log(event.currentTarget.id, 'event.currentTarget.id');
    }
  return (
    <div>
      <h1 className='queue__header'> Your Queue: </h1>
      <div className="tickets__container">
        {tickets && tickets.map(ticket => {
          return (
            <div  className="single__ticket" key={ticket.ticketId}>
              <div className='single__ticket--info'>
                <h3 className='ticket__title'> Ticket number :</h3> <h3 className='ticket__number'> {ticket.ticketId}</h3>
                <p className='ticket__status'> Status : {ticket.status}</p>
              </div>
              <div className='single__ticket--buttons'>
                <button  className='button ' id={ticket.ticketId} status={ticket.status} onClick={handleClick}>
                  {ticket.status === 'waiting' ? 'Call' :  'Arrived' || ticket.status==='called' ? 'Confrim Arrival' : null}
                </button>
                {ticket.status === 'called' || ticket.status ==='cancelle' ?
                <button className='button button--cancel'id={ticket.ticketId} onClick={handleCancel}>Cancel</button>
                : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default TicketList
// const callNextClient = async ()=>{
  //  //1. console log particular ticket id when button clicked
  //     let nextTicketId;
  //     const nextTicketIndex = tickets.findIndex(t=>t.ticketId==calledTicketId)+1
  //     console.log(nextTicketIndex,'nextTicketIndex');
  //     if (nextTicketIndex<tickets.length) {
  //       nextTicketId = tickets[nextTicketIndex].ticketId;
  //       console.log(nextTicketId,'nextTicketId');
  //     }else{
  //       console.log('no more ticket to call!!');
  //
  //      // if there is a person who was called we find them and set them to DONE
  //      if (calledTicketId >=1){
  //        await axios.put(`http://localhost:5001/api/tickets/${calledTicketId}`,{status:'done'})
  //        await axios.put(`http://localhost:5001/api/tickets/${nextTicket.ticketId}`,{status:'called'})
  //     // if not we dont do anythign as its FIRST PERSON
  //      }else{
  //        await axios.put(`http://localhost:5001/api/tickets/1`,{status:'called'})
  //      }
  //   }