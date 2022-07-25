import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import queue from './queue.png';


function RestaurantItem({restaurantInfo,customerLocation}) {
 // /tickets/business/:id
 console.log(restaurantInfo,'this is restaurantInfo in RestaurantItem');
 const { name,id,description,address,waitingTime} = restaurantInfo;
 const location = restaurantInfo.geometry?.location
 const image = restaurantInfo.photos
 console.log(location,'location restaurantInfo');


 console.log('this is customerLocation in RestaurantItem',customerLocation);

 const [tickets, setTickets] = useState(null)
 const [distance, setDistance] = useState(null)
 
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


  const peopleWaiting = tickets?.filter(t=>t.status == 'waiting').length;
  return (
    <Link to= {`/customer/store/${id}`} state={{name,id,image,description}}>
      <div className='card'>
          <div className='restaurant-card__top'>
            <img className='restaurant-card__image' src={image} alt= {`${name}`} />
            <h6 className='text grey-text waiting-time'> waiting time: <p className='text no-padding'> {waitingTime*peopleWaiting}min</p></h6>
            <h3 className='text restaurant-card__text--name'>{name}</h3>
          </div>
          <div className='restaurant-card__footer'>
              <div className='column'>
                <p className='text restaurant-card__text--address'>{address}</p>
                <h6></h6>
              </div>
             {tickets ?  <div className='restaurant-card__queue'> 
            <img src={queue} className='queue-icon' alt='logo' />
                <p className="text restaurant-card__text--queue">{peopleWaiting} Waiting</p></div> : null}
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