import './TicketList.css'
import {useParams} from "react-router-dom";
import React, { useEffect, useState } from 'react'
import ClockLoader from "react-spinners/ClockLoader";
import { useDispatch, useSelector } from 'react-redux'
import { getTicketsForOneBiz, changeStatus } from '../../../slices/ticketsSlice'

function TicketList() {
  const dispatch = useDispatch();
  let { businessId } = useParams();
  const { ticketsUpdateFlag, areLoading } = useSelector((store) => store.ticketsReducer);
  const tickets = useSelector(store => getTicketsForOneBiz(store, businessId))
  const [allStatus, setAllStatus] = useState({ 'waiting': null, 'done': null, 'cancelled': null})
  
  useEffect(() => { updateStatus() }, [ticketsUpdateFlag,tickets.length])
  console.log(ticketsUpdateFlag);

  const updateStatus = () => {
    const allStatusCopy = {...allStatus}
    if (tickets.length != 0) {
      console.log('tickets in updateStatus: ', tickets);
      // can't get the latest updated tickets!!!!!!!!
      // Click, flag change, fetchticket, updateStatus
      for (const status in allStatusCopy) {
        const ticketsWithAStatus = tickets.filter(ticket => ticket.status == status)
        allStatusCopy[status] = ticketsWithAStatus.length;
        setAllStatus(allStatusCopy)
      }
    }
  }

  const handleClick =  async (event) => {
    const id = event.currentTarget.id
    const status = tickets.find(ticket => ticket.ticketId == id).status
    if (status === 'waiting') dispatch(changeStatus({id, status:'called'}))
    if (status === 'called') dispatch(changeStatus({id, status: 'done'}))
  }

  const handleCancel =  async (event) => {
    const id = event.currentTarget.id
    const status= tickets.find(ticket => ticket.ticketId == id).status
    if (status == 'called') dispatch(changeStatus({ id, status: 'cancelled' }))
  }

  const override = {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "45%",
    margin: "0 auto",
    borderColor: "red",
  };

  const { waiting, done, cancelled } = allStatus

  return (
    <div>
      {areLoading
        ? <ClockLoader color={'#4A90E2'} loading={loading} size={100} cssOverride={override} />
        : <>
          {!tickets || tickets.length == 0
            ? <h3>No Queue Yet</h3>
            : <>
            <div className="ticketlist--display">
              <h3 className="ticketList--Heading"> Your Queue </h3>
              <div className='stat-wrapper'>
                <div className="ticketList--stat ticketlist-waiting"> <strong>Waiting :</strong>  {waiting}</div>
                <div className="ticketList--stat ticketlist-done"> <strong> Done : </strong> {done}</div>
                <div className="ticketList--stat ticketlist-cancelled"> <strong> Cancelled : </strong> {cancelled}</div>
              </div>
            </div>
            <div className="list__container">
              {tickets
                ?.filter(ticket => (['waiting', 'called'].includes(ticket.status)))
                .map(ticket => {
                return (
                  <div  className="card queue-info-card" key={ticket.ticketId}>
                    <div className='row'>
                      <div className='column column-your-queue-ticket-number'>
                        <h4 className='text'> Ticket number :</h4> <h4 className='text your-queue-number-text'> {ticket.ticketId}</h4>
                      </div>
                      <div className="column column--your-queue-status">
                        <p className='text'> Status : </p>
                        <p className={`colored-text-box ${ticket.status == 'called' ? "colored-text-box--green" : "colored-text-box--yellow"}`}>{ticket.status}</p>
                      </div>
                    </div>
                    <div className='row'>
                      <button className='button ' id={ticket.ticketId} status={ticket.status} onClick={handleClick}>
                        {ticket.status === 'waiting' ? 'Call' :  'Arrived' || ticket.status=='called' ? 'Confrim Arrival' : null}
                      </button>
                      {ticket.status=='called'
                      ?<button className='button button--cancel'id={ticket.ticketId} onClick={handleCancel}>Cancel</button>
                      : null}
                    </div>
                  </div>
                )}
              )}
            </div>
          </>}
        </>}
    </div>)
  }
  export default TicketList
