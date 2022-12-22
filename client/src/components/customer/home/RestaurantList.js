import './customerHome.css'
import RestaurantItem from './RestaurantItem'
import React from 'react'
import { useSelector } from 'react-redux'
import ClockLoader from "react-spinners/ClockLoader";

const RestaurantList = ({ search, cusLocation }) => {
  const { allBusiness,areLoading } = useSelector(store => store.businessReducer)
  
  const searchMatches = (restaurant) =>
    search === "" || restaurant.name?.toLowerCase().includes(search.toLowerCase())

  const override = { display: "block", position: "absolute", top: "50%", left: "45%", margin: "0 auto", borderColor: "red", };
  if (areLoading)
    return <ClockLoader color={'#4A90E2'} loading={areLoading} size={100} cssOverride={override} />
  
  return (
    <div >
      <ul className='list__container'>
        {allBusiness
          ?.filter(restaurant => searchMatches(restaurant) && restaurant)
          .map((restaurant,index) => (
            <RestaurantItem
              key={index}
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
