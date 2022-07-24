import React, { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import './Navbar.css';
import logo from './logo.png';

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const businessId = localStorage.getItem('businessId')
  console.log('local Storage businessId in Navbar: ', businessId);
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = '0px';
    }
  }, [showLinks]);
  
  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} className='logo' alt='logo' />
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
          <Link to="/customer/home">customer</Link>
          <Link to="about">About</Link>
          {!isAuthenticated ? 
            <Link to="./SignIn">Login!</Link> 
            :
            (<>
            <Link to="./Signup">Add your Business</Link>
              <Link to="./Logout">Logout!</Link>
              <Link to={`ticketList/${businessId}`}>My Queue</Link>
              <Link to="./profile">My Profile</Link>
            </>)
      }
               
                
          </ul>
        </div>
        <ul className='social-icons'>
          
              <li>
                <a href='www.facebook.com'><FaFacebook /></a>
              </li>
              <li>
                <a href='www.twitter.com'><FaTwitter /></a>
              </li>
              <li>
                <a href='www.linkedin.com/'><FaLinkedin /></a>
              </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;