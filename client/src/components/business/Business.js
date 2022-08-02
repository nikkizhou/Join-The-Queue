import React, { useEffect, useState } from 'react'
import TicketList from './ticketList/TicketList'
import Signup from './SignUp/Signup'
import SignIn from './SignIn/SignIn'
import About from '../About/About'
import {Routes,Route} from "react-router-dom";
import Navbar from '../Navbar/Navbar.js'
import { useAuth0 } from '@auth0/auth0-react';
import Logout from './Logout/Logout';
import Profile from './Profile/Profile.js'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBusiness, getBusinessById, updateBusinessId } from '../../slices/businessSlice'


function Business() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const { businessId } = useSelector((store) => store.businessReducer);
  // const business = useSelector(store => getBusinessById(store, businessId))
  // console.log('business in Business', business);

  const getInitializedBizId = async ()=>{
    const userFromDB = await axios.get(`http://localhost:5001/api/user/${user.email}`)
    const bizId = userFromDB.data.businessId;
    dispatch(updateBusinessId(bizId))
  }

  useEffect(()=> {
    const fetchBusinessWrapper = async () => {
      dispatch(fetchBusiness());
    }
    fetchBusinessWrapper();
    getInitializedBizId()
  }, [isAuthenticated])
  



  return (
    <>
    <Navbar businessId={businessId} customerPage={false} />
    <Routes>
    {!isAuthenticated ? (
      <React.Fragment>
        Please Login.
        <Route path='/signIn' element={<SignIn/>}/>
      </React.Fragment>
      ) :
      <React.Fragment>
        <Route path='/logout' element={<Logout/>}/>
        <Route path="ticketList/:businessId" element={<TicketList/>} />
        <Route path='/profile' element={<Profile user={user} businessId={businessId}/>}/>
        <Route path='/signUp' element={<Signup userInfo={user}/>}/>
      </React.Fragment>}
      <Route path='/about' element={<About/>}/>
    </Routes>
  </>
  )
}

export default Business
