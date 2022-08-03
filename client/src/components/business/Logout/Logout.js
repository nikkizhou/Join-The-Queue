import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Logout.css'

const Logout= () => {
  const { user, isAuthenticated } = useAuth0();
  const { logout } = useAuth0();

  return (
    <div  className='logout-page'>
      { isAuthenticated && (
        <div>
          <h2 className='logout-title'>{user.name}</h2>
          <p className='logout-title'>{user.email}</p>
        </div>
      )}
      <button className='logout-btn' onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
    </div>
  );
};

export default Logout;
