import React from 'react'
import { Link } from 'react-router-dom'

function NavCusPart({isAuthenticated}) {
  return (
    <>
      {!isAuthenticated ?
      <Link to="/business/SignIn">Business</Link>
      :<Link to="/business/profile">Business</Link>
      } 
      <Link to="/home">Home</Link>
      <Link to="about">About</Link>
    </>
  )
}

export default NavCusPart
