import './customerHome.css'
import RestaurantItem from './RestaurantItem'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const RestaurantList = ({ search }) => {
  const { allBusiness } = useSelector(store => store.businessReducer)
  const [customerLocation, setcustomerLocation] = useState(null)

  const getcustomerLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setcustomerLocation(pos)
      });
    } 
  }
  
  useEffect(() => {
    getcustomerLocation()
  }, []);

  const searchMatches = (restaurant) =>
    search === "" || restaurant.name?.toLowerCase().includes(search.toLowerCase())

  return (
    <div >
      <ul className='list__container'>
        {allBusiness
          ?.filter(restaurant => searchMatches(restaurant) && restaurant)
          .map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurantInfo = {restaurant}
              customerLocation = {customerLocation}
            />
          ))
        }
      </ul>
    </div>
  )
};

export default RestaurantList;
