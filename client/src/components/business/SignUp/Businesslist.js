import React, { useState, useEffect } from "react";
import BusinessItem from './BusinessItem';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

function AllBusiness({updateBusinessId,businessId,userInfo,businessInput,test}) {
    //const navigate = useNavigate();
    const [allBusiness, setAllBusiness] = useState([]) 
    //
    const fetchDataFromGoogle = async (address)=>{
        
      console.log(address,'-address in fetchDataFromGoogle');
      const formattedAddress = address?.replace(' ','%20').replace(',','%2C');
      const data = await axios.get(`http://localhost:5001/api/getGoogleData/${formattedAddress}`)
        .catch(err=>console.log(err));
      console.log(data.data.candidates,'-data.candidates in fetchDataFromGoogle');
      setAllBusiness(data.data.candidates)
    }
    //fetchDataFromGoogle("Fleminggatan 11, 112 26 Stockholm, Sverige")

    useEffect (() => {
        const address = businessInput.address
        fetchDataFromGoogle(address);
    },[businessInput])
    //
    console.log('allBusiness addresses. - ',allBusiness.map(b=>b.formatted_address));

    return (
        <>
            <h2>This is BusinessList for {businessInput.name}</h2>
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