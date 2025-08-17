import React from 'react';
import { Link } from 'react-router-dom'; // I'll need to install react-router-dom
import { LOGO_URL } from '../changeme';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={LOGO_URL} alt="LMS Logo" />
          </Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login" className="btn">Sign In</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
