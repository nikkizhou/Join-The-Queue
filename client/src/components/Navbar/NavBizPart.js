import React from 'react'
import { Link } from 'react-router-dom'

function NavBizPart({ isAuthenticated, businessId }) {
  return (
    <>
      <Link to="/customer/home">customer</Link>
      <Link to="./about">About</Link>
      {!isAuthenticated
      ? <Link to="./SignIn">Login!</Link>
      :(<>
        <Link to="./Signup">Add your Business</Link>
        <Link to={`ticketList/${businessId}`}>My Queue</Link>
        <Link to="./profile">My Profile</Link>
        <Link to="./Logout">Logout!</Link>
      </>)}
    </>
  )
}

export default NavBizPart
