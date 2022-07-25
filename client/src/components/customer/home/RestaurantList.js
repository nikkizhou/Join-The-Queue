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
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log(pos,'pos in getcustomerLocation')
      setcustomerLocation(pos)
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}



useEffect(()=> getcustomerLocation(),[])

return (
  <div >
    <form  className="customer-form__input">
        <input
          className="customer-form"
          type="text"
          value={search}
          placeholder = "Search for a restaurant..."
          onChange={event => setSearch(event.target.value)}
        />
       
      </form>

    <ul className='list__container'>
      {restaurantList.filter(res =>{
  
       if(search ===""){
        console.log(res.name,'resName');
        return res
       } else if(res.name?.toLowerCase().includes(search.toLowerCase())){
        return res
       }

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