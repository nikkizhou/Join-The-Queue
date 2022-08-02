import React,{useEffect} from 'react'
import {Routes,Route} from "react-router-dom";
import Home from './home/Home';
import Store from './store/Store';
import Feedback from './feedback/Feedback';
import Navbar from '../Navbar/Navbar.js'
import About from '../About/About'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTickets, getTicketById, getTicketsForOneBiz, updateCalledTicketId } from '../../slices/ticketsSlice'

function Customer() {
  const dispatch = useDispatch();
  const { areLoading, allTickets, calledTicketId } = useSelector((store) => store.ticketsReducer);
  const ticketsForOneBiz = useSelector(store => getTicketsForOneBiz(store, 1))
  const ticket = useSelector(store => getTicketById(store, 1))
  console.log('ticket in Customer:',ticket);

  useEffect(() => {
    const fetchTicketsWrapper = async () => {
      dispatch(fetchTickets());
    } 

    fetchTicketsWrapper();
    dispatch(updateCalledTicketId(66))
  }, []);

  console.log(ticket,'ticket with id 1');

  return (
    <>
      <div>test:{allTickets.length} {ticketsForOneBiz.length} calledTicketId:{calledTicketId}</div>
    <Navbar customerPage={true} />
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
