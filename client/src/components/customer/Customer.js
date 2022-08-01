import React,{useEffect} from 'react'
import {Routes,Route} from "react-router-dom";
import Home from './home/Home';
import Store from './store/Store';
import Feedback from './feedback/Feedback';
import NavbarCustomer from './Navbar/NavbarCustomer'
import About from '../About/About'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, ticketsAreLoading } from '../../slices/ticketsSlice'

function Customer() {
  const dispatch = useDispatch();
  const { areLoading, hasError, tickets } = useSelector((store) => store.ticketsReducer);

  useEffect(() => {
    const fetchTickets = async () => {
      dispatch(fetchData());
    } 

    fetchTickets();
    dispatch(ticketsAreLoading('false'))

  }, []);

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
