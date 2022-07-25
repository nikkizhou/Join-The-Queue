import React, { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from 'react-router-dom';


function QueueForm() {
  const location = useLocation()
  const { id } = location.state
  const navigate = useNavigate();
  const [cusInfo, setCusInfo] = useState({name:'', number:''})
  const setNameValue = (e)=> setCusInfo({...cusInfo, name:e.target.value})
  const setNrValue = (e)=> setCusInfo({...cusInfo, number:e.target.value})

  const createTicket =  async ()=>{
    
    return  axios.post(`http://localhost:5001/api/tickets`, {
      ...cusInfo,
      resId: id,
      status:'waiting',
      customerId: cusInfo.number,
    }).catch(error=> console.log(error))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = await createTicket();
    //
    const ticketId = data.data.ticketId
    localStorage.removeItem('cancelled')

    navigate(`/customer/feedback/?ticketId=${ticketId}&businessId=${id}`);
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

