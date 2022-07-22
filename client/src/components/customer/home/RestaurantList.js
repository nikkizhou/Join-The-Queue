import React from 'react'
import RestaurantItem from './RestaurantItem'
import { useState } from 'react';
import './customerHome.css'

const RestaurantList = ({ restaurantList }) =>{

  const [search, setSearch] = useState("")



return (
  <div >
    <form  className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          placeholder = "Meatballs..."
          onChange={event => setSearch(event.target.value)}
        />
        <button className="button search-button" type="submit">
          Search
        </button>
      </form>
    {/* <h3 className='card__header'>Restaurants in Stockholm</h3> */}

    <ul className='list__container'>
      {restaurantList.filter(res =>{
       if(search ===""){
        console.log(res.name)
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