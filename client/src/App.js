import Customer from './components/customer/Customer';
import Business from './components/business/Business';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { fetchTickets } from './slices/ticketsSlice'
import { fetchBusiness} from './slices/businessSlice'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import NotFound from './components/NotFound'


function App() {
  const dispatch = useDispatch()
  const { ticketsUpdateFlag,tickets } = useSelector((store) => store.ticketsReducer);
  
  useEffect(() => {
    const fetchTicketsWrapper = async () => dispatch(fetchTickets());
    const fetchBusinessWrapper = async () => dispatch(fetchBusiness());
    //setInterval(() => fetchTicketsWrapper(), 2000);
    // socket.on('ticketsUpdatedInDb', data => {
    //   fetchTicketsWrapper()
    //   console.log(data,'data');
    // });
    fetchTicketsWrapper()
    fetchBusinessWrapper();
    console.log('fetchTickets and fetchBusiness in App is working');
  }, [ticketsUpdateFlag, JSON.stringify(tickets)])

  // const { allBusiness } = useSelector(store => store.businessReducer)
  // console.log(allBusiness, 'allBusiness in App');

  return (
    <>
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/customer/*" element={<Customer />}/>
          <Route path="/business/*" element={<Business />} />
          <Route path="/" element={<Navigate replace to='/customer/home' />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
