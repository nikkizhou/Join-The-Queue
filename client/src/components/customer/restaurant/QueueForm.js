import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {createTicket} from '../../../slices/ticketsSlice'

function QueueForm({ restaurantInfo }) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  if (restaurantInfo) var { id, geometry: { location } } =  restaurantInfo 
  const [cusInfo, setCusInfo] = useState({name:'', number:''})
  const setNameValue = (e)=> setCusInfo({...cusInfo, name:e.target.value})
  const setNrValue = (e)=> setCusInfo({...cusInfo, number:e.target.value})

  const createTicketId = async () => {
    const createTicketWrapper = async (detail) => dispatch(createTicket(detail));
    const detail = { ...cusInfo, resId: id, status: 'waiting', customerId: cusInfo.number, }
    const newTicket = await createTicketWrapper(detail);
    return newTicket.payload.ticketId
  }
    
  const handleSubmit = async (e)=>{
    e.preventDefault();
    localStorage.removeItem('cancelled')
    const ticketId = await createTicketId();
    navigate(`/customer/feedback/?ticketId=${ticketId}&businessId=${id}`, { state: { location }});
  }

  return (
    <div className='list-container'>
      <p className="text">Enter your name and number:</p>
      <form onSubmit={handleSubmit} >
        <div className='form'>
          <input className='form-input' type="text" placeholder="Name" onChange={setNameValue} required/>
          <input className='form-input' type="number" placeholder="Number"  onChange={setNrValue} required/>
        <button className='button' type='submit'>Join the Queue</button>
        </div>
      </form >
    </div>
  )
}

export default QueueForm
