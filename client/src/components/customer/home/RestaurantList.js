import React, { useEffect } from 'react'
import RestaurantItem from './RestaurantItem'
import { useState } from 'react';
import './customerHome.css'

const RestaurantList = ({ restaurantList }) =>{
  const [search, setSearch] = useState("")
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
useEffect(()=> getcustomerLocation()
,[])


return (
  <div >
    <form  className="form">
      <input
        className="form-input"
        type="text"
        value={search}
        placeholder = "Search for a restaurant..."
        onChange={event => setSearch(event.target.value)}
      />
    </form>
    <ul className='list__container'>
      {restaurantList.filter(res =>{
       if(search ==="" || res.name?.toLowerCase().includes(search.toLowerCase())){return res}
      }).map((restaurant, index) => (
        <RestaurantItem
          key = {restaurant.id}
          restaurantInfo = {restaurant}
          customerLocation = {customerLocation}
        />
      ))}
    </ul>
  </div>
)};

export default RestaurantList;