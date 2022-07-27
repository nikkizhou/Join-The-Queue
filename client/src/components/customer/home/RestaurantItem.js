import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import queue from './queue.png';
import clock from './stopwatch.png';
import { getDistance,convertDistance } from 'geolib';


function RestaurantItem({restaurantInfo,customerLocation}) {

 const { name,id,description,formatted_address,waitingTime} = restaurantInfo;
 const businessLocation = restaurantInfo.geometry?.location
//  console.log(businessLocation,'gowno')
 const image = restaurantInfo.imgLink
 
 const [tickets, setTickets] = useState(null)
 const [distance, setDistance] = useState(null)


 const fetchTicket = async (id) => {
   try {
     const tickets = await axios.get(`/api/tickets/business/${id}`)
     setTickets(tickets.data)
 } catch (e) {
     console.error(e)
   }
 }

 useEffect(() => {
   fetchTicket(id);
   const distanceLoc = businessLocation && customerLocation && getDistance(businessLocation,customerLocation)
   setDistance((distanceLoc / 1000).toFixed(1))
 }, [tickets]);
 
  const peopleWaiting = tickets?.filter(t=>t.status == 'waiting').length;
  const minDisplay = peopleWaiting  ? waitingTime * peopleWaiting +' mins' : 'No Q!'
  
  return (
    <Link to= {`/customer/store/${id}`} state={{name,id,image,description,businessLocation,formatted_address}}>
      <div className='card'>
          <div className='restaurant-card__top'>
            <img className='restaurant-card__image' src={image} alt= {`${name}`} />

            <h6 className='text grey-text waiting-time row'> <img src={clock} className='queue-icon' alt='logo' /> <p className='text no-padding'>{minDisplay}</p></h6>
            
            <h3 className='text restaurant-card__text--name small-padding'>{name}</h3>
          </div>
          <div className='restaurant-card__footer'>
              <div className='column'>
                <p className='text restaurant-card__text--address 10px'>{formatted_address}</p>
                {distance && distance>0 ? <h6 className='text restaurant-card__text--distance'>{distance}km From You</h6>
                : <h6 className='text restaurant-card__text--distance' >Calculating distance...</h6>}
                <h6></h6>
              </div>
             {tickets ?  <div className='restaurant-card__queue'> 
            <img src={queue} className='queue-icon' alt='logo' />
                <p className="text restaurant-card__text--queue">{peopleWaiting}</p></div> : null}
              {/* <p className='restaurant--price'>{restaurant.price}</p> */}
          </div>
      </div>
    </Link>
  )
}

export default RestaurantItem