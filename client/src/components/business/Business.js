import React, { useEffect, useState } from 'react'
import TicketList from './ticketList/TicketList'
import Signup from './SignUp/Signup'
import SignIn from './SignIn/SignIn'
import About from '../About/About'
import {Routes,Route} from "react-router-dom";
import NavbarBusiness from './Navbar/NavbarBusiness'
import { useAuth0 } from '@auth0/auth0-react';
import Logout from './Logout/Logout';
import Profile from './Profile/Profile.js'
import axios from 'axios'


function Business() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [businessId, setBusinessId] = useState(0);

  const getInitializedBizId = async ()=>{
    const userFromDB = await axios.get(`http://localhost:5001/api/user/${user.email}`)
    const bizId = userFromDB.data.businessId;
    setBusinessId(bizId)
  }

  useEffect(()=> {
    //setInterval(async()=> await getInitializedBizId(),1000)
    getInitializedBizId()
  }
  ,[isAuthenticated])

  const updateBusinessId = (id)=>{
    setBusinessId(id)
  }

  return (
    <>
    <NavbarBusiness businessId={businessId}/>
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
        <Route path='/profile' element={<Profile user={user} businessId={businessId}/>}/>
        <Route path='/signUp' element={<Signup businessId={businessId} updateBusinessId={updateBusinessId} userInfo={user}/>}/>
      </React.Fragment>}
      <Route path='/about' element={<About/>}/>
    </Routes>
  </>
  )
}

export default Business
