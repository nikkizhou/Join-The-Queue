import React, { useEffect, useState } from 'react'
import {Routes,Route} from "react-router-dom";
import Home from './home/Home';
import Restaurant from './restaurant/Restaurant';
import Feedback from './feedback/Feedback';
import Navbar from '../Navbar/Navbar.js'
import About from '../About/About'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBusiness } from '../../slices/businessSlice'
import { getTicketsForOneBiz } from '../../slices/ticketsSlice'
import NotFound from '../NotFound';

function Customer({ ticketsUpdateFlag }) {
  const { allTickets, calledTicketId } = useSelector((store) => store.ticketsReducer);
  const ticketsForOneBiz = useSelector(store => getTicketsForOneBiz(store, 1))
  //const ticket = useSelector(store => getTicketById(store, 1))
  const [cusLocation, setcusLocation] = useState(null)

  const getcustomerLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setcusLocation(pos)
      });
    }
  }

  useEffect(() => {
    getcustomerLocation()
  }, []);
  
  return (
    <>
    <Navbar customerPage={true} />
    <Routes>
        <Route path="home" element={<Home cusLocation={cusLocation} />} />
        <Route path="restaurant/:resId" element={<Restaurant />} />
        <Route path="feedback" element={<Feedback cusLocation={cusLocation} />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default Customer
