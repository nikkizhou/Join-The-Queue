import React from 'react'
import { useLocation } from 'react-router'

const DetailCard = () => {
    const location = useLocation()
    const { name,id,image,description } = location.state
  return (
      
    <div className='restaurant-card'>
      <h1 className='restaurant-card__name'>{name} </h1>
      <img className='restaurant-card__image' src={image} alt={name} />
      <p className='restaurant-card__description'>{description}</p>
    </div>
  )
}



export default DetailCard