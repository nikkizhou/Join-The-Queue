import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './customerHome.css'
//import logo from './queue1.png';



function RestaurantItem({ name,id,image,description,address}) {
 // /tickets/business/:id

 
 const [tickets, setTickets] = useState(null)

 const fetchTicket = async (id) => {
   try {
     const tickets = await axios.get(`http://localhost:5001/api/tickets/business/${id}`)
     setTickets(tickets.data)
 } catch (e) {
     console.error(e)
   }
 }
 useEffect(() => {
   fetchTicket(id);
 }, []);



  return (
    <Link to= {`/customer/store/${id}`} state={{name,id,image,description}}>
      <div className='restaurant-card'>
          <img className='restaurant-card__image' src={image} alt= {`${name}`} />
          <div className='restauant-card__header'>
          </div>
          <div className='restaurant-card__footer'>
            <p className='restaurant-card__text'>{name}</p>
            <p className='restaurant-card__text restaurant-card__text--address'>{address}</p>
            <img src={logo} className='logo' alt='logo' />
             {tickets ?  <div className='restaurant-card__queue'> 
             <p className='restaurant-card__text restaurant-card__text--q-info'>groups waiting:</p>
                <p className="restaurant-card__text restaurant-card__text--queue">{tickets.length}</p></div> : null} 
              {/* <p className='restaurant--price'>{restaurant.price}</p> */}
          </div>
      </div>
    </Link>
  )
}

// key = {restaurant.id}
// name = {restaurant.name}
// image = {restaurant.image}
// queue= {restaurant.queue}

export default RestaurantItem