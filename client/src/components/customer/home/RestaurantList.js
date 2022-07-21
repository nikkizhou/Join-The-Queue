import React from 'react'
import RestaurantItem from './RestaurantItem'
import './customer.css'

const RestaurantList = ({ restaurantList }) =>{

return (
  <div >
    {/* <h3 className='card__header'>Restaurants in Stockholm</h3> */}
    <ul className='list__container'>
      {restaurantList.map((restaurant, index) => (
        
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