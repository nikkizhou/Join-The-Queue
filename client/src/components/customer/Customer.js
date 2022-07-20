import React from 'react'
import {Routes,Route} from "react-router-dom";
import Home from './home/Home';
import Store from './store/Store';
import Feedback from './feedback/Feedback';


function Customer() {
  return (
    <>
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="store/*" element={<Store />} />
      <Route path="feedback" element={<Feedback />} />
    </Routes>
    </>
  )
}

export default Customer