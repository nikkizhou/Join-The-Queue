import Customer from './components/customer/Customer';
import Business from './components/business/Business';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { fetchTickets } from './slices/ticketsSlice'
import { fetchBusiness} from './slices/businessSlice'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect,useState } from 'react'
import NotFound from './components/NotFound'
import Home from './components/customer/home/Home';
import { getcustomerLocation } from './utils';

function App() {
  const dispatch = useDispatch()
  const { ticketsUpdateFlag, tickets } = useSelector((store) => store.ticketsReducer);
  
  const [cusLocation, setcusLocation] = useState(null)
  useEffect(() => {getcustomerLocation(setcusLocation)}, []);
  
  useEffect(() => {
    getcustomerLocation(setcusLocation)
    const fetchTicketsWrapper = async () => dispatch(fetchTickets());
    const fetchBusinessWrapper = async () => dispatch(fetchBusiness());
    setInterval(() => fetchTicketsWrapper(), 2000);
    fetchTicketsWrapper()
    fetchBusinessWrapper();
  }, [ticketsUpdateFlag, JSON.stringify(tickets)])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/customer/*" element={<Customer cusLocation={cusLocation}/>}/>
          <Route path="/business/*" element={<Business />} />
          <Route path="/" element={<Customer cusLocation={cusLocation} />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
