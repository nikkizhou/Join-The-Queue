import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


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
          <div className='restauant-card__header'>
            <p className='restaurant-card__name'>{name}</p>
          </div>
          <img className='restaurant-card__image' src={image} alt= {`${name}`} />
          <div className='restaurant-card__footer'>
             {tickets ?  <div className='restaurant-card__queue'> <p>Groups waiting:</p> <p className="restaurant-card__queue__length">{tickets.length}</p></div> : null} 
              {/* <p className='restaurant--price'>{restaurant.price}</p> */}
            <p className='restaurant-card__address'>{address}</p>
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