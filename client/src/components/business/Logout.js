import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const Logout= () => {
  const { user, isAuthenticated } = useAuth0();
  const { logout } = useAuth0();

  return (
    <>
    { isAuthenticated && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )}
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
    </>
  );
};

export default Logout;