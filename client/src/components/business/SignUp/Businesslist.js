import React, { useState, useEffect } from "react";
import BusinessItem from './BusinessItem';
import axios from 'axios'

function BuisnessList({userInfo,businessInput,status}) {
  const [allBusiness, setAllBusiness] = useState([]) 

  const fetchDataFromGoogle = async (name)=>{
    const formattednName = name?.replace(' ','%20').replace(',','%2C');
    const data = await axios.get(`/api/getGoogleData/${formattednName}`).catch(err=> console.log(err))
    setAllBusiness(data.data)
  }

  useEffect (() => {
      const name = businessInput.name
      fetchDataFromGoogle(name);
  },[businessInput])

  return (
    <>
      {status=='Submit' && allBusiness && allBusiness.map((googleBizData,index) => 
        <BusinessItem key={index} 
                      googleBizData={googleBizData} 
                      userInfo={userInfo} 
                      businessInput={businessInput}/>
        )}
    </>
  )
}

export default BuisnessList
