import React from 'react'
import { useLocation } from 'react-router'

const DetailCard = () => {
    const location = useLocation()
    const { name,id,image,description } = location.state
  return (
    <>
      <div className='card detail-card'>
        <img className='restaurant-card__image' src={image} alt={name} />
        <div className='restaurant-card__footer'>      
          <h1 className='text store-title'>{name}</h1>
          <p className='text restaurant-card__text--address'></p>
        </div>
        <p className='restaurant-card__description'>{description}</p>
      </div>
    </>

  )
}



export default DetailCard