import React, { useEffect,useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useNavigate} from 'react-router-dom';
import './Profile.css'
import axios from 'axios';

const Profile = ({user, businessId}) => {
  const navigate = useNavigate();
  const {isAuthenticated, isLoading } = useAuth0();
  const [biz, setBiz] = useState(null)

  const getBiz = async () => {
    const data = await axios.get(`http://localhost:5001/api/business/${businessId}`)
    // const bizData = businessId && await axios.get('/api/business/'+businessId)
    console.log(data.data);
     setBiz(data.data)
  }
  
  useEffect(()=> {
    getBiz()
  }
  ,[businessId])

  console.log(biz,'biz');

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated &&  (
      <div className='profile-page'>
        <h3 className='profile-itle'>My Account:</h3>
        <h3  className='profile-title'>{user.name}</h3>
        {biz ? <>
          <h2 className = 'profile-title'>My Business: </h2>



        <div className="card" onClick = {() => navigate({ pathname: `/business/ticketList/${businessId}`})}>
            <h3 className = 'text large-text'>{biz.name}</h3>
            <h3 className = 'text'>{biz.formatted_address}</h3>
            <div className= 'restaurant-card__top'>
              <img className='restaurant-card__image' src={biz.imgLink} />
            </div>
        </div>
         
          <button className='button' onClick = {() => navigate({ pathname: `/business/ticketList/${businessId}`})}>Check My Queue</button>
        </>
        :<><h3 className = 'profile-title'>Click here to register your business</h3>
          <button className='button' onClick = {() => navigate({ pathname: `/business/Signup`})}>Register</button></>}
      </div>
    )
  );
};

export default Profile;


/* description: "easeaseaeaseaseaease"
formatted_address: "Fleminggatan 11, 112 26 Stockholm, Sverige"
geometry: {location: {…}, viewport: {…}}
id: 9
imgLink: "https://media-cdn.tripadvisor.com/media/photo-s/05/c1/22/ba/pelikan.jpg"
name: "Eat East"
opening_hours: {open_now: true}
photos: [{…}]
rating: 4.3
waitingTime: "22" */