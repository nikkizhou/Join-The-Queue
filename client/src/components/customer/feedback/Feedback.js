import './Feedback.css'
// import '../home/customerHome.css'
import React, { useEffect,useState } from 'react'
import axios from 'axios'
// import { Router } from 'react-router'
import { useSearchParams, useNavigate } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";


function Feedback() {
  
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
  
  const showNext = peopleWaiting>0 ? <h4>People In Front<h2 className='queue-number'>{peopleWaiting}</h2></h4>: null                  
  const waitingTime = business?.waitingTime;
  console.log('business in SignUp!!', business);

return (
  <div className='list__container'>

  <div className='card column'>
    
            {loading ?  <ClockLoader color={'#4A90E2'} loading={loading} size={100} cssOverride={override}/>:
            <div>
              
              {done ? <h1 className='finish-msg'> Seems like everything went smoothly! See you next time {ticket.name} </h1>  :
              <>
    {ticket.status== 'cancelled' ? <h1  className='finish-msg'> Restaurant decided to cancel your ticket. Most likely due to no show</h1> : 
    <>

  {!cancelled ?  
      <div className="">
        {ticketId ?  (<div className='ticket__number-container'>
            <h4 className="text text-box">Hi <h4 className="text"> { ticket.name }</h4>your ticket number is:</h4>
            <h1 className='text large-text'> {ticketId}</h1>
        </div>) : null}

        <div className='row top-margin'>
          <h2 className={`colored-text-box small-margin ${ticket.status == 'called' ? "colored-text-box--green small-margin" : "colored-text-box--yellow"}`}> {ticket.status} </h2>
        </div>

        {ticket.status == 'called' ?  (<div className='ticket__status'>
            <h4 className="called"><h4> { ticket.name }</h4>Head to the restaurant! </h4>
        </div>) : ''}

        <div className='list__container top-margin'>
          
            {business ?  (
            <div className='ticket__name-container'>
                <h4>You're in the queue for</h4><h4 className='text large-text'> {business.name}</h4>
            </div>) 
          : <h1>Business does not exist</h1>}

        <div className='queue-info-container top-margin'>{showNext}</div>
        <p>Estimated Waiting Time: <span className='waitingTime'>{peopleWaiting*waitingTime}</span>min</p>
        </div>
        <div className='ticket__queue-info'>
        <button className='button button--cancel' onClick={cancelTicket}>Leave the queue</button>
        </div>
      </div>
      : 
      <div>
        <h1>Your ticket has been cancelled</h1>
        <button className="button" onClick={() =>{navigate(`/customer/home`)}}>Queue again?</button>
      </div>}
    </>
    }
  
        </>}
    </div>}
  </div>
  </div>

    )
    
  }
  export default Feedback


  