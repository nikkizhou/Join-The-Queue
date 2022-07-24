import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useNavigate} from 'react-router-dom';

const Profile = ({user, businessId}) => {
  const {isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  console.log(user,'user in Profile');

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <h3>My Account:</h3>
        <h3>{user.name}</h3>
        {businessId
        ?<>
          <h2>My Business: </h2>
          <button onClick = {() => navigate({ pathname: `/business/ticketList/${businessId}`})}>Check My Queue</button>
        </>
        :<><h3>Click here to register your business</h3>
          <button onClick = {() => navigate({ pathname: `/business/Signup`})}>Register</button></>}
      </div>
    )
  );
};

export default Profile;