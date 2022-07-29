import './Feedback.css'
import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { useSearchParams, useNavigate } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";
import {useLocation} from 'react-router-dom'
import queue from '../home/queue.png'
import clock from '../home/stopwatch.png';


function Feedback() {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const ticketId = searchParams.get('ticketId');
  const businessId =searchParams.get('businessId');

  const [tickets, setTickets] = useState(null);
  const [ticket, setTicket] = useState('ticket default');
  const [business,setBusiness] = useState(null);
  const [peopleWaiting,setPeopleWaiting] = useState(0);
  const [loading, isLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [cancelled,setCancelled] = useState(localStorage.getItem('cancelled'));
  const [customerCoordinates, setCustomerCoordinates] = useState(null)

  const location = useLocation();
  const {businessLocation} = location.state
  const bizCoordinates = businessLocation.lat + ',' + businessLocation.lng;
  
  const getCustomerCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCustomerCoordinates(position.coords.latitude + ',' + position.coords.longitude);
        }, (error) => {
          console.log(error);
        }, { enableHighAccuracy: true, timeout: 5000 , maximumAge: 10000 }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  useEffect(() => {
    getCustomerCoordinates();
  }
  , [])

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
    const business = await axios.get(`/api/business/${businessId}`)
    setBusiness(business.data);
  }
  
  const cancelTicket = async ()=>{
    await axios.put(`/api/tickets/${ticketId}`, {status:'cancelled'})
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
  
  const showNext = peopleWaiting>0 ? 
    <div classname="column">
      <div className="row">
        <img src={queue} className='queue-icon' alt='logo' />
        <h2 className='text large-text'>{peopleWaiting} </h2>
      </div>
      <p className='text grey-text no-margin no-padding'>groups in front</p>
    </div> : null   

  const waitingTime = business?.waitingTime;

return (
  <div className='list__container'>
    <div className=''>
      {loading ?  <ClockLoader color={'#4A90E2'} loading={loading} size={100} cssOverride={override}/>:
    <div>
              
    {done ? <h1 className='finish-msg'> Seems like everything went smoothly! See you next time {ticket.name} </h1>  :<>
    {ticket.status== 'cancelled' ? <h1 className='finish-msg'> Your ticket has been cancelled. <p  className='text grey-text'> (If this was not you the business has cancelled your ticket.)</p> </h1> : <>

    {!cancelled ?  
      <div className="card ap">
        <div className=''>
            <h4 className="text text-box">Welcome { ticket.name }</h4>
        </div>
      <div className={`${ticket.status == 'called' ? "colored-text-box--green" : "colored-text-box--grey"}`}>
        {ticket.status == 'called' ?  (
          <div className='ticket__status'>
            <h4 className="called">Your ticket has been called! Please make your way to {business.name}. </h4>
          </div>) 
          : (
          <div className='list__container'>
            <h4 className="text queue-grey-text small-padding ">You're in the queue for<h4 className='text large-text'> {business.name}</h4></h4>
      <div className="container">
        <div className=''>{showNext}</div>
        <p className="text queue-grey-text"><img src={clock} className='queue-icon' alt='logo' />
        <span className='text large-text'>{peopleWaiting*waitingTime}</span>mins</p>
      </div>
    </div>) }
  </div>

    <div className='colored-text-box center medium-margin'>
      <h4>Your ticket number</h4>
      <h1 className="text white large-text"> {ticketId}</h1>
    </div>

    <iframe
      className = 'map'
      width="350"
      height="200"
      frameBorder="0" style={{border:0}}
      referrerpolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCWJ0GsY0BynFt81-H82ok6RqIsZilr768&origin=${customerCoordinates}&destination=${bizCoordinates}&mode=walking`}>
    </iframe>

    <div className='ticket__queue-info'>
      <button className='button button--cancel' onClick={cancelTicket}>Leave the queue</button>
      </div>
    </div>
    : 
    <div>
      <h1>Your ticket has been cancelled</h1>
      <button className="button" onClick={() =>{navigate(`/customer/home`)}}>Queue again?</button>
    </div>}
        </>}
      </>}
    </div>}
  </div>
</div>
)}

export default Feedback
