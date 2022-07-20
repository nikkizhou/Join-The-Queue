import React from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from 'react-router-dom';


function QueueForm() {
  const location = useLocation()
  const { id } = location.state
  const customerId = uuidv4();
  const navigate = useNavigate();
 
  const createTicket =  async ()=>{
    return  axios.post(`http://localhost:5001/api/tickets`, {
      resId: id,
      status:'waiting',
      customerId
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
    <div>
        <form onSubmit={handleSubmit} >
            <input type="text" placeholder="Enter your name" required/>
            <input type="number" placeholder="Enter your phone number" required/>
            <button type='submit'>Jon the Queue</button>
        </form >

    </div>
  )
}

export default QueueForm

