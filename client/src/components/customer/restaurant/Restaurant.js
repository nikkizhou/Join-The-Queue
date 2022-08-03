import './Restaurant.css'
import React from 'react'
import QueueForm from './QueueForm'
import DetailCard from './DetailCard'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getBusinessById } from '../../../slices/businessSlice'

const Restaurant = () => {
  const { allBusiness } = useSelector(store => store.businessReducer)
  console.log(allBusiness, 'allBusiness in Restaurant');

  const { resId } = useParams();
  const restaurantInfo = useSelector(store => {
    // console.log(store, 'store in Restaurant');
    // console.log(resId, 'resId in Restaurant');
    return getBusinessById(store, resId)
  })
  //console.log(restaurantInfo, 'restaurantInfo in Restaurant');
  

  return (
    <div className="store__container">
      <DetailCard restaurantInfo = {restaurantInfo} />
      <QueueForm restaurantInfo={restaurantInfo} id={resId } />
    </div>
  )
}

export default Restaurant
