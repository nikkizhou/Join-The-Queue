import React, { useEffect,useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useNavigate} from 'react-router-dom';
import './Profile.css'
import axios from 'axios';

const Profile = ({user, businessId}) => {
  const {isAuthenticated, isLoading } = useAuth0();
  //const [biz, setBiz] = useState(null)
  const navigate = useNavigate();

  // const getBiz = async () => {
  //   const bizData = businessId && await axios.get('/api/businesses/'+businessId)
  //   
  //   setBiz(bizData.data)
  // }
  

  // useEffect(()=>{getBiz()},[])

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated &&  (
      <div className='profile-page'>
        <h3 className='profile-itle'>My Account:</h3>
        <h3  className='profile-title'>{user.name}</h3>
        {businessId
        ?<>
          <h2 profile-title>My Business: </h2>
          <button className='btn' onClick = {() => navigate({ pathname: `/business/ticketList/${businessId}`})}>Check My Queue</button>
        </>
        :<><h3 profile-title>Click here to register your business</h3>
          <button className='btn' onClick = {() => navigate({ pathname: `/business/Signup`})}>Register</button></>}
      </div>
    )
  );
};

export default Profile;