import React,{useEffect} from 'react'
import {Routes,Route} from "react-router-dom";
import Home from './home/Home';
import Restaurant from './restaurant/Restaurant';
import Feedback from './feedback/Feedback';
import Navbar from '../Navbar/Navbar.js'
import About from '../About/About'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBusiness } from '../../slices/businessSlice'
import {getTicketsForOneBiz } from '../../slices/ticketsSlice'

function Customer() {
  const { allTickets, calledTicketId } = useSelector((store) => store.ticketsReducer);
  const ticketsForOneBiz = useSelector(store => getTicketsForOneBiz(store, 1))
  //const ticket = useSelector(store => getTicketById(store, 1))
  
  return (
    <>
    <div>test:{allTickets.length} {ticketsForOneBiz.length} calledTicketId:{calledTicketId}</div>
    <Navbar customerPage={true} />
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="restaurant/:resId" element={<Restaurant />} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="about" element={<About />} />
    </Routes>
    </>
  )
}

export default Customer
