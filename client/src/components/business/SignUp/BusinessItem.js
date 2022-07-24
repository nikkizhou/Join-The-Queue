import React from 'react'
import axios from 'axios';

function BusinessItem({googleBizData,updateBusinessId,userInfo,businessInput}) {
  console.log(googleBizData,'-googleBizData in BusinessItem');

  const addToDB = async () => {
    const businessDB = await axios.post('http://localhost:5001/api/business', {...googleBizData,waitingTime:businessInput.waitingTime})
      .catch(error=> console.log(error));

    const createdBusinessId = businessDB.data.id;
    updateBusinessId(createdBusinessId)

    await axios.put(`http://localhost:5001/api/user/${userInfo.email}`,{businessId: createdBusinessId})
    alert('Your business is now registered in our system! ')
  };

  const photos = googleBizData.photos

  return (
    <>
      <div>Name: {googleBizData.name}</div>
      <div>Address: {googleBizData.formatted_address}</div>
      <div>location lat : {googleBizData.geometry.location.lat}</div>
      <button onClick={addToDB}>This is my business</button>
      
    </>
  )
}

// <img className='business-card__image' src={} alt= {`alt`} />

export default BusinessItem