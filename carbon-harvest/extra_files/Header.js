import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header Component - Main navigation header with logo on the left and primary navigation links on the right.
 * @returns {JSX.Element} The Header component.
 */
const Header = () => {
  return (
    <header className="header" role="banner">
      <nav className="nav-container" aria-label="Main Navigation">
        {/* Left Section: Logo and Site Name */}
        <div className="nav-left">
          <Link to="/" className="logo" aria-label="Home">
            <img
              src={require('/logo.png')}
              alt="CarbonHarvest Logo"
              width="150"
              height="40"
              loading="eager"
            />
          </Link>
          {/* Optional site name next to the logo */}
          <span className="site-name">CarbonHarvest</span>
        </div>
        {/* Right Section: Primary Navigation Links */}
        <div className="nav-right">
          <Link to="/about-us" className="nav-link">About Us</Link>
          <Link to="/contact-us" className="nav-link">Contact Us</Link>
          <Link to="/regulations" className="nav-link">How it Works</Link>
          <Link to="/register" className="nav-link">Registration</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
