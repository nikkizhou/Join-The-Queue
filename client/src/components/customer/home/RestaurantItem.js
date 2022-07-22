import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import queue from './queue.png';


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
          <div className='restaurant-card__top'>
            <img className='restaurant-card__image' src={image} alt= {`${name}`} />
            <h6 className='restaurant-card__text restaurant-card__text--extra-info'> 20 mins</h6>
            <h3 className='restaurant-card__text restaurant-card__text--name'>{name}</h3>
          </div>
          <div className='restaurant-card__footer'>
              <div className='column'>
                <p className='restaurant-card__text restaurant-card__text--address'>{address}</p>
                <h6></h6>
              </div>
             {tickets ?  <div className='restaurant-card__queue'> 
            <img src={queue} className='queue-icon' alt='logo' />
                <p className="restaurant-card__text restaurant-card__text--queue">{tickets.length}</p></div> : null}
                {console.log('tick info',tickets)}
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