import React,{useEffect, useState} from 'react'
import axios from 'axios';

function BusinessItem({googleBizData,updateBusinessId,userInfo,businessInput}) {
  
  

  const addToDB = async () => {
    const {waitingTime, imgLink} = businessInput
    
    const businessDB = await axios.post('http://localhost:5001/api/business', {...googleBizData,waitingTime,imgLink})
      .catch(error=> console.log(error))

    const createdBusinessId = businessDB.data.id;
    updateBusinessId(createdBusinessId)

    await axios.put(`http://localhost:5001/api/user/${userInfo.email}`,{businessId: createdBusinessId})
    alert('Your business is now registered in our system! ')
  };

  

  return (
    <div className='list__container'>
          <div className='card'>
      <img className='restaurant-card__image' src={businessInput.imgLink} alt= {`photo for ${googleBizData.name}`} />
      <div className='restaurant-card__footer'>
        <div className="column">
        <p className='text'>Name: {googleBizData.name}</p>
        <p className='text'>Address: {googleBizData.formatted_address}</p>
        </div>
        <p className='text grey-text'>Rating: {googleBizData.rating}</p>
      </div>
      <button className="button" onClick={addToDB}>This is my business</button>
    </div>
    </div>
  )
}

export default BusinessItem