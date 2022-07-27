import React, { useState, useEffect } from "react";
import BusinessItem from './BusinessItem';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

function AllBusiness({updateBusinessId,userInfo,businessInput,status}) {
    //const navigate = useNavigate();
    const [allBusiness, setAllBusiness] = useState([]) 
    const fetchDataFromGoogle = async (name)=>{
      

      const formattednName = name?.replace(' ','%20').replace(',','%2C');
      const data = await axios.get(`/api/getGoogleData/${formattednName}`)
        .catch(err=> console.log(err))
      
      setAllBusiness(data.data)
    }
    //fetchDataFromGoogle("Fleminggatan 11, 112 26 Stockholm, Sverige")

    useEffect (() => {
        const name = businessInput.name
        fetchDataFromGoogle(name);
      
    },[businessInput])
    //
    

    return (
        <>
          {status=='Submit' && allBusiness && allBusiness.map((googleBizData,index) => 
            <BusinessItem key={index} 
                          googleBizData={googleBizData} 
                          updateBusinessId={updateBusinessId} 
                          userInfo={userInfo} 
                          businessInput={businessInput}/>
            )}
            
        </>
    )
}

export default AllBusiness