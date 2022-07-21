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
          {/* <img src={logo} className='logo' alt='logo' /> */}
          <h2 className='logo'>JoinTheQ</h2>
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
                <Link to="/business/signIn">Business</Link>
                <Link to="about">About</Link>
          </ul>
        </div>
        <ul className='social-icons'>
          <li>
            <Link to='www.facebook.com/jointheq'><FaFacebook /></Link>
          </li>
          <li>
            <Link to='www.twitter.com/jointheq'><FaTwitter /></Link>
          </li>
          <li>
            <Link to='www.linkedin.com/jointheq'><FaLinkedin /></Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;