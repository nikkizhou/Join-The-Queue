import React, { useEffect, useState } from 'react'
import TicketList from './ticketList/TicketList'
import Signup from './SignUp/Signup'
import SignIn from './SignIn/SignIn'
import About from '../About/About'
import {Routes,Route} from "react-router-dom";
import NavbarBusiness from './Navbar/NavbarBusiness'
import { useAuth0 } from '@auth0/auth0-react';
import Logout from './Logout';


function Business() {
  const { isAuthenticated } = useAuth0();
  console.log('This is Business component');
  const [businessId, setBusinessId] = useState(0);
  const [user, setUser] = useState('');

  const updateBusinessId = (id)=>{
    setBusinessId(id)
  }

  return (
    <>
    <NavbarBusiness businessId={businessId}/>
    <h1>Welcome!</h1>
    <Routes>
    {!isAuthenticated ? (
      <React.Fragment>
          Please Login.
          <Route path='/signIn' element={<SignIn businessId={businessId}/>}/>
          
          </React.Fragment>
      ) :
      <React.Fragment>
           <Route path='/logout' element={<Logout businessId={businessId}/>}/>
            <Route path="ticketList/:businessId" element={<TicketList/>} />
            <Route path='/signUp' element={<Signup updateBusinessId={updateBusinessId}/>}/>
        </React.Fragment>}
       <Route path='/about' element={<About/>}/>
    </Routes>
  </>
  )
}

export default Business