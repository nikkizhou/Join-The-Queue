import React, { useEffect, useState } from 'react'
import {Routes,Route} from "react-router-dom";
import Home from './home/Home';
import Restaurant from './restaurant/Restaurant';
import Feedback from './feedback/Feedback';
import Navbar from '../Navbar/Navbar.js'
import About from '../About/About'
import NotFound from '../NotFound';

function Customer({cusLocation}) {
  return (
    <>
    <Navbar customerPage={true} />
    <Routes>
      <Route path="/home" element={<Home cusLocation={cusLocation} />} />
      <Route path="restaurant/:resId" element={<Restaurant />} />
      <Route path="feedback" element={<Feedback cusLocation={cusLocation} />} />
      <Route path="about" element={<About />} />
      <Route path="/" element={<Home cusLocation={cusLocation} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default Customer
