import React, { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import './Navbar.css';
import logo from './logo.png';

const Navbar = () => {
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
                <Link to="./Signup">Sign Up!</Link>
                <Link to="./SignIn">Sign In!</Link>
                <Link to="about">About</Link>
                <Link to="ticketList/1">My Queue</Link>
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