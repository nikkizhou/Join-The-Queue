import axios from 'axios';
import About from '../About/About'
import Signup from './SignUp/Signup'
import SignIn from './SignIn/SignIn'
import Logout from './Logout/Logout';
import Profile from './Profile/Profile.js'
import Navbar from '../Navbar/Navbar.js'
import TicketList from './ticketList/TicketList'
import React, { useEffect } from 'react'
import { Routes, Route,Navigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchBusiness, updateBusinessId } from '../../slices/businessSlice'

function Business() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const { businessId } = useSelector((store) => store.businessReducer);
  //console.log('businessId in Business: ', businessId);
  
  const getExistedBizId = async () => {
    const userFromDB = user && await axios.get(`http://localhost:5001/api/user/${user.email}`)
    const bizId = userFromDB?.data.businessId;
    bizId && dispatch(updateBusinessId(bizId))
    //console.log('bizId in getExistedBizId: ', bizId);
  }

  useEffect(()=> {
    getExistedBizId()
  }, [isAuthenticated])

  return (
    <>
    <Navbar businessId={businessId} customerPage={false} />
    <Routes>
      {!isAuthenticated
      ? <React.Fragment>
        Please Login.
        <Route path='/signIn' element={<SignIn />} />
      </React.Fragment>
      :<React.Fragment>
        <Route path='/logout' element={<Logout/>}/>
        <Route path="ticketList/:businessId" element={<TicketList/>} />
        <Route path='/profile' element={<Profile user={user} businessId={businessId}/>}/>
        <Route path='/signUp' element={<Signup />}/>
      </React.Fragment>}
      <Route path='/about' element={<About />} />
    </Routes>
  </>
  )
}

export default Business
