import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1>404 - Page Not Found!</h1>
    <Link to="/customer/home">Go Home</Link>
  </div>
);

export default NotFound;
