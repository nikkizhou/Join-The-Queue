import React, { useState } from 'react'
import TicketList from './ticketList/TicketList'
import Signup from './SignUp/Signup'
import SignIn from './SignIn/SignIn'
import About from '../About/About'
import {Routes,Route} from "react-router-dom";
import NavbarBusiness from './Navbar/NavbarBusiness'


function Business() {
  const [businessData, setBusinessData] = useState({id:3});
  return (
    <>
    <NavbarBusiness />
    <Routes>
      <Route path='/signIn' element={<SignIn/>}/>
      <Route path='/signUp' element={<Signup/>}/>
      <Route path="ticketList/:businessId" element={<TicketList businessData= {businessData}/>} />
      <Route path='/about' element={<About/>}/>
    </Routes>
  </>
  )
}

export default Business