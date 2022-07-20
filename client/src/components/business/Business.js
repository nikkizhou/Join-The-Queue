import React, { useState } from 'react'
import TicketList from './ticketList/TicketList'
import Navbar from './Navbar/Navbar'
import Signup from './SignUp/Signup'
import SignIn from './SignIn/SignIn'
import About from './About/About'
import {Routes,Route} from "react-router-dom";


function Business() {
  const [businessData, setBusinessData] = useState({id:3});
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/SignUp' element={<Signup/>}/>
      <Route path='/SignIn' element={<SignIn/>}/>
      <Route path='/About' element={<About/>}/>
      <Route path="ticketList/:businessId" element={<TicketList businessData= {businessData}/>} />
    </Routes>
  </>
  )
}

export default Business