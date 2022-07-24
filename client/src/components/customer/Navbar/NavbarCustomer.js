import React, { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import './Navbar.css';

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
    <nav className='nav-center'>
        <div className='nav-header'>
          {/* <img src={logo} className='logo' alt='logo' /> */}
          <h2 className='logo'>JoinTheQ</h2>
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
                <Link to="/business/">Business</Link>
                <Link to="about">About</Link>
          </ul>
        </div>
        <ul className='social-icons'>
          <li>
            <Link to='www.facebook.com/'><FaFacebook /></Link>
          </li>
          <li>
            <Link to='www.twitter.com/'><FaTwitter /></Link>
          </li>
          <li>
            <Link to='www.linkedin.com/'><FaLinkedin /></Link>
          </li>
          
        </ul>
    </nav>
  );
};

export default Navbar;