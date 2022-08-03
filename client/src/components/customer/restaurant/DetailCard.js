import React from 'react'

const DetailCard = ({ restaurantInfo }) => {
  if (restaurantInfo) var { name,  formatted_address, imgLink, description } = restaurantInfo

  return (
    <>
      <div className='card detail-card'>
        <img className='restaurant-card__image' src={imgLink} alt={name} />
        <div className='restaurant-card__footer'>      
          <h1 className='text store-title'>{name}</h1>
          <p className='text restaurant-card__text--address'>{formatted_address}</p>
        </div>
        <p className='restaurant-card__description'>{description}</p>
      </div>
    </>

  )
}



export default DetailCard
