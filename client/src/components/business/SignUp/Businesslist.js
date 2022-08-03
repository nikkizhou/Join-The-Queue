import React, { useState, useEffect } from "react";
import BusinessItem from './BusinessItem';
import axios from 'axios'

function BuisnessList({ businessInput }) {
  const [matchedBusiness, setMatchedBusiness] = useState(null)

  const fetchDataFromGoogle = async (name) => {
    const formattednName = encodeURIComponent(name);
    if (name) {
      const data = await axios.get(`/api/getGoogleData/${formattednName}`)
        .catch(err => console.log(err))
      setMatchedBusiness(data.data)
    }
  }

  useEffect(() => { fetchDataFromGoogle(businessInput.name) }, [businessInput.name])

  if (matchedBusiness?.length === 0) return <h3>No Matched result from Google Map. Please contact Customer Service.</h3>
  
  return (
    <>
    {matchedBusiness && <h4>Results for <span className="highlight">{businessInput.name}</span> from Google Map:</h4>}
    {matchedBusiness?.map((googleBizData, index) =>
      <BusinessItem key={index}
        googleBizData={googleBizData}
        businessInput={businessInput} />)
    }</>
  )
}

export default BuisnessList
