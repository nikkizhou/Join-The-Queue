import React from 'react'
import {Routes,Route} from "react-router-dom";
import Home from './home/Home';
import Store from './store/Store';
import Feedback from './feedback/Feedback';
import NavbarCustomer from './Navbar/NavbarCustomer'
import About from '../About/About'

function Customer() {
  return (
    <>
    <NavbarCustomer/>
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="store/*" element={<Store />} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="about" element={<About />} />
    </Routes>
    </>
  )
}

export default Customer