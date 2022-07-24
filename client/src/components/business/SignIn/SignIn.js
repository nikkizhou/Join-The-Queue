import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; 
import './SignIn.css'

const SignIn = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
    { loginWithRedirect()}
    </>
  )
};

//3.
export default SignIn;