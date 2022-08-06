import './Restaurant.css'
import QueueForm from './QueueForm'
import DetailCard from './DetailCard'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { getBusinessById } from '../../../slices/businessSlice'

const Restaurant = () => {
  const { resId } = useParams();
  const restaurantInfo = useSelector(store =>getBusinessById(store, resId))

  return (
    <div className="store__container">
      <DetailCard restaurantInfo = {restaurantInfo} />
      <QueueForm restaurantInfo={restaurantInfo} id={resId } />
    </div>
  )
}

export default Restaurant
