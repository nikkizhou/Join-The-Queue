import './Feedback.css'
import React, { useEffect,useState } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";
import { useDispatch, useSelector } from 'react-redux';
import queue from '../home/queue.png'
import clock from '../home/stopwatch.png';
import { getBusinessById } from '../../../slices/businessSlice'
import { changeStatus, getTicketsForOneBiz } from '../../../slices/ticketsSlice'

function Feedback({ cusLocation }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();
  const ticketId = searchParams.get('ticketId');
  const resId =searchParams.get('businessId');
  
  const { areLoading } = useSelector(store => store.ticketsReducer);
  const tickets = useSelector(store => getTicketsForOneBiz(store, resId))
  const ticket = tickets.find(t => t.ticketId == ticketId);
  const restaurantInfo = useSelector(store => getBusinessById(store, resId))
  const [peopleWaiting, setPeopleWaiting]=useState(0);

  useEffect(() => {
    const currentTicketIndex = tickets.findIndex(ticket => ticket.ticketId == ticketId)
    const ticketsInFrontOfMe = tickets.slice(0, currentTicketIndex)
    const peopleWaiting = ticketsInFrontOfMe.filter(t => t.status == 'waiting').length
    setPeopleWaiting(peopleWaiting)
  }, [JSON.stringify(tickets)])

  const cancelTicket = async () => {
    dispatch(changeStatus({ id: ticketId, status: 'cancelled' }))
  }
 
  if (restaurantInfo)
    var { name, waitingTime, geometry: { location } } = restaurantInfo
  
  const bizCoordinates = location && (location.lat + ',' + location.lng);
  const customerCoordinates = cusLocation && (cusLocation.lat + ',' + cusLocation.lng);
  
  const displayPeopleWaiting = peopleWaiting > 0 &&
    <div className="column">
      <div className="row">
        <img src={queue} className='queue-icon' alt='logo' />
        <h2 className='text large-text'>{peopleWaiting} </h2>
      </div>
      <p className='text grey-text no-margin no-padding'>groups in front</p>
    </div>    

  const override = {display: "block",position: "absolute",top: "50%", left: "45%",margin: "0 auto",borderColor: "red",};
  if (areLoading) return (<ClockLoader color={'#4A90E2'} loading={areLoading} size={100} cssOverride={override} /> )
  
  return (
    <div className='list__container'>
    {ticket.status == 'done' && <h1 className='finish-msg'> Seems like everything went smoothly! See you next time {ticket.name} </h1>}
    {ticket.status == 'cancelled' &&
    <>
      <h1 className='finish-msg'> Your ticket has been cancelled. <p className='text grey-text'> (If this was not you the business has cancelled your ticket.)</p></h1>
      <button className="button" onClick={() => navigate(`/customer/home`)}>Queue again?</button>
    </>
    }
    {['waiting', 'called'].includes(ticket.status) &&
      <div className="card ap">
        <h4 className="text text-box">Welcome {ticket.name}</h4>
        <div className={`${ticket.status == 'called' ? "colored-text-box--green" : "colored-text-box--grey"}`}>
        {ticket.status == 'called'
        ? (
          <div className='ticket__status'>
            <h4 className="called">Your ticket has been called! Please make your way to {name}. </h4>
          </div>)
        : (
          <div className='list__container'>
            <h4 className="text queue-grey-text small-padding ">You're in the queue for<span className='text large-text'> {name}</span></h4>
            <div className="container">
              {displayPeopleWaiting}
              <p className="text queue-grey-text"><img src={clock} className='queue-icon' alt='logo' />
              <span className='text large-text'>{peopleWaiting &&waitingTime&&peopleWaiting * waitingTime}</span>mins</p>
            </div>
          </div>)}
        </div>

        <div className='colored-text-box center medium-margin'>
          <h4>Your ticket number</h4>
          <h1 className="text white large-text"> {ticketId}</h1>
        </div>

        <iframe
          className='map'
          width="350"
          height="200"
          frameBorder="0" style={{ border: 0 }}
          referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyC1ZO9vpIVU-W55xO0GcnM0VffxSkGlqQI&origin=${customerCoordinates}&destination=${bizCoordinates}&mode=walking`}>
        </iframe>

        <div className='ticket__queue-info'>
          <button className='button button--cancel' onClick={cancelTicket}>Leave the queue</button>
        </div>
      </div>
    }
  </div>
  )
}

export default Feedback
