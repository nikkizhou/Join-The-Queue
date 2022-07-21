import React, { useEffect, useState } from 'react'
import TicketList from './ticketList/TicketList'
import Signup from './SignUp/Signup'
import SignIn from './SignIn/SignIn'
import About from '../About/About'
import {Routes,Route} from "react-router-dom";
import NavbarBusiness from './Navbar/NavbarBusiness'


function Business() {
  console.log('This is Business component');
  const [businessId, setBusinessId] = useState(0);
  //const [registered, setRegistered] = useState(false)

  const updateBusinessId = (id)=>{
    setBusinessId(id)
  }

  return (
    <>
    <NavbarBusiness businessId={businessId}/>
    <Routes>
      <Route path='/signIn' element={<SignIn businessId={businessId}/>}/>
      <Route path='/signUp' element={<Signup updateBusinessId={updateBusinessId}/>}/>
      <Route path="ticketList/:businessId" element={<TicketList/>} />
      <Route path='/about' element={<About/>}/>
    </Routes>
  </>
  )
}

export default Business