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
    console.log(cusInfo,'cusInfo');
    return  axios.post(`http://localhost:5001/api/tickets`, {
      ...cusInfo,
      resId: id,
      status:'waiting',
      customerId: cusInfo.number,
    }).catch(error=> console.log(error));
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = await createTicket();
    //console.log(data.data,'data.data in handleSubmit!');
    const ticketId = data.data.ticketId
    navigate(`/customer/feedback/?ticketId=${ticketId}&businessId=${id}`);
  }

  return (
    <div className='customer-form-container'>
      <form onSubmit={handleSubmit} >
        <div className='customer-form__input'>
          <input className='customer-form' type="text" placeholder="Enter your name" onChange={setNameValue} required/>
          <input className='customer-form' type="number" placeholder="Enter your phone number"  onChange={setNrValue} required/>
        <button className='button customer-form__btn' type='submit'>Join the Queue</button>
        </div>
      </form >
    </div>
  )
}

export default QueueForm

