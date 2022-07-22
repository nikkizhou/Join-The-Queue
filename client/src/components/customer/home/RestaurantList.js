import React, { useEffect } from 'react'
import RestaurantItem from './RestaurantItem'
import { useState } from 'react';
import './customerHome.css'

const RestaurantList = ({ restaurantList }) =>{

  const [search, setSearch] = useState("")
  console.log(search)


//  useEffect(()=>,[search])

return (
  <div >
    <form  className="customer-form__input">
        <input
          className="customer-form"
          type="text"
          value={search}
          placeholder = "Search"
          onChange={event => setSearch(event.target.value)}
        />
        {/* <button className="button search-button" type="submit">
          Search
        </button> */}
      </form>
    {/* <h3 className='card__header'>Restaurants in Stockholm</h3> */}

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
            id = {restaurant.id}
            name = {restaurant.name}
            image = {restaurant.imge}
            description={restaurant.description}
            address = {restaurant.address}
            // price = {restaurant.price}
            // rating = {restaurant.rating}
            // location = {restaurant.location}
        />
      ))}
    </ul>
  </div>
  )};

export default RestaurantList;