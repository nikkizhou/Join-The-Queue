import React, { useState, useEffect } from "react";
import BusinessItem from './BusinessItem';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

function AllBusiness({updateBusinessId,businessId,userInfo,businessInput,test}) {
    //const navigate = useNavigate();
    const [allBusiness, setAllBusiness] = useState([]) 
    const fetchDataFromGoogle = async (name)=>{
      console.log(name,'-name in fetchDataFromGoogle');

      const formattednName = name?.replace(' ','%20').replace(',','%2C');
      const data = await axios.get(`http://localhost:5001/api/getGoogleData/${formattednName}`)
        .catch(err=>console.log(err));
      console.log(data.data,'-data.candidates in fetchDataFromGoogle');
      setAllBusiness(data.data)
    }
    //fetchDataFromGoogle("Fleminggatan 11, 112 26 Stockholm, Sverige")

    useEffect (() => {
        const name = businessInput.name
        fetchDataFromGoogle(name);
    },[businessInput])
    //
    console.log('allBusiness in businessList',allBusiness);

    return (
        <>
            <h2>Results for {businessInput.name}:</h2>
            {allBusiness && allBusiness.map((googleBizData,index) => 
              <BusinessItem key={index} 
                            googleBizData={googleBizData} 
                            updateBusinessId={updateBusinessId} 
                            userInfo={userInfo} 
                            businessInput={businessInput}/>
            )}
            <button>Not my business? Contact us here!</button>
        </>
    )
}

export default AllBusiness