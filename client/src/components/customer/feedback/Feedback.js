import './Feedback.css'
// import '../home/customerHome.css'
import React, { useEffect,useState } from 'react'
import axios from 'axios'
// import { Router } from 'react-router'
import { useSearchParams, useNavigate } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";


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

  const [loading, isLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [cancelled,setCancelled] = useState(localStorage.getItem('cancelled'));

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

    const currentTicketIndex = tickets.data.findIndex(ticket =>ticket.ticketId == ticketId)
    const ticketsInFrontOfMe = tickets.data.slice(0,currentTicketIndex)
    const peopleWaitingD = ticketsInFrontOfMe.filter(t=>t.status=='waiting').length

    const ticket = tickets.data[currentTicketIndex];
    if(ticket.status == 'done'){
      setDone(true)
      localStorage.setItem('done',true)
    }

    setTickets(tickets.data)
    setPeopleWaiting(peopleWaitingD)
    setTicket(ticket)
    isLoading(false)

  }
  const getBusiness = async ()=>{
    const business = await axios.get(`http://localhost:5001/api/business/${businessId}`)
    setBusiness(business.data);
  }
  
  const cancelTicket = async ()=>{
    await axios.put(`http://localhost:5001/api/tickets/${ticketId}`, {status:'cancelled'})
    console.log('clicked: ', ticket.status, 'ticketID:', ticket.ticketId)
    localStorage.setItem('cancelled', true)
    setCancelled(true)
  }
    
  useEffect (()=>{
    const getData = async ()=>{
      await getBusiness()
      setInterval(async()=> await getTickets(),1000)
    }
    getData();
  },[])
  
  const showNext = peopleWaiting>0 ? <h4>There are <h2 className='queue-number'>{peopleWaiting}</h2> tables in front of you</h4>
                                   : null                  
  // return (
  //   <div className='ticket'>
  //       {ticketId ?  (<div className='ticket__number-container'>
  //           <h4 className="ticket__number-info">Hi <h4> { ticket.name }</h4>, your ticket number is :</h4>
  //           <h1 className='ticket__number'> {ticketId}</h1>
  //       </div>) : <h1></h1>}
  //       <h3 className='ticket__status'> Your status :</h3>
  //       <h2 className='ticket__status status'> {ticket.status} </h2>
  //       {ticket.status == 'called' ?  (<div className='ticket__status'>
  //           <h4 className="called">Head to the restaurant! <h4> { ticket.name }</h4></h4>
  //       </div>) : <h4>hold your horses</h4>}
  //       <div className='info-container'>
        
  //       {business ?  (<div className='ticket__name-container'>
  //                       <h4 className='ticket__info'>Restaurant name:</h4><h4 className='ticket__name'> {business.name}</h4>
  //       </div>) : <h1>Business does not exist</h1>}
  //       <div className='queue-info-container'>{showNext}</div>
  //       {/* {calledTicketId ?  <h4 className='ticket__info'>Next is: {nextIs}</h4> :  <h1>Available!</h1>} */}
  //       </div>
  //       <div className='ticket__queue-info'>
  //       <button className='button button--cancel' onClick={cancelTicket}>Leave the queue</button>
  //       </div>

  //   </div>
  // )
 
// }
// export default Feedback


return (
  <div className='list__container'>

<div className='card column'>
  
          {loading ?  <ClockLoader color={'#4A90E2'} loading={loading} size={100} cssOverride={override}/>:
          <div>
            
            {done ? <h1> Seems like everything went smoothly! See you next time {ticket.name} </h1>  :
            <>
  
  {!cancelled ?  
          <div className="">
            {ticketId ?  (<div className='ticket__number-container'>
                <h4 className="ticket__number-info">Hi <h4> { ticket.name }</h4>, your ticket number is :</h4>
                <h1 className='text text-large'> {ticketId}</h1>
            </div>) : <h1></h1>}
  
  
            <h3 className='text'> Your status :</h3>
            <h2 className='colored-text-box'> {ticket.status} </h2>
            {ticket.status == 'called' ?  (<div className='ticket__status'>
                <h4 className="called">Head to the restaurant! <h4> { ticket.name }</h4></h4>
            </div>) : <h4>Hold your horses. Your number will be called soon</h4>}
  
            <div className='info-container'>
              
              {business ?  (
              <div className='ticket__name-container'>
                   <h4 className='ticket__info'>You're in the queue for</h4><h4 className='text large-text'> {business.name}</h4>
              
              </div>) 
              : <h1>Business does not exist</h1>}
              <div className='queue-info-container'>{showNext}</div>
            </div>
            <div className='ticket__queue-info'>
            <button className='button button--cancel' onClick={cancelTicket}>Leave the queue</button>
            </div>
          </div>
  
          : 
          <div>
            <h1>Your ticket has been cancelled</h1>
            <button onClick={() =>{navigate(`/customer/home`)}}>Queue again?</button>
          </div>}
            </>}
        </div>}
</div>
</div>

    )
    
  }
  export default Feedback