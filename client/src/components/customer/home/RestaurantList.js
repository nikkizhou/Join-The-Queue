import './customerHome.css'
import RestaurantItem from './RestaurantItem'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const RestaurantList = ({ search, cusLocation }) => {
  const { allBusiness } = useSelector(store => store.businessReducer)
  
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
              cusLocation={cusLocation}
            />
          ))
        }
      </ul>
    </div>
  )
};

export default RestaurantList;
