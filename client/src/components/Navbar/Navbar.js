import './Navbar.css';
import NavBizPart from './NavBizPart';
import NavCusPart from './NavCusPart';
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useRef, useEffect } from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaBars } from 'react-icons/fa';

const Navbar = ({ customerPage, businessId }) => {
  let { isAuthenticated} = useAuth0();
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleLinks = () => setShowLinks(!showLinks);

  useEffect(() => {
    let linksHeight = linksRef.current.getBoundingClientRect().height;
    linksContainerRef.current.style.height = showLinks ? `${linksHeight}px` : '0px'
  }, [showLinks]);

  return (
    <nav className='nav-center'>
      <div className='nav-header'>
        <h2 className='logo'>JoinTheQ</h2>
        <button className='nav-toggle' onClick={toggleLinks}>
          <FaBars />
        </button>
      </div>
      <div className='links-container' ref={linksContainerRef}>
        <ul className='links' ref={linksRef}>
        {customerPage
        ? <NavCusPart isAuthenticated = {isAuthenticated}/>
        : <NavBizPart businessId = {businessId} isAuthenticated={isAuthenticated} />
        }
        </ul>
      </div>
      <ul className='social-icons'>
        <li><Link to='www.facebook.com/'><FaFacebook /></Link></li>
        <li><Link to='www.twitter.com/'><FaTwitter /></Link></li>
        <li><Link to='www.linkedin.com/'><FaLinkedin /></Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
