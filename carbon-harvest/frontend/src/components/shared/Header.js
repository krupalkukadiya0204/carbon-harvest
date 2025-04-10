import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/headers.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <h1 className="header-title">CarbonHarvest</h1>
        </Link>

        <nav className="header-nav">
          <Link to="/" className={`header-nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/about-us" className={`header-nav-link ${isActive('/about-us') ? 'active' : ''}`}>
            About
          </Link>
          <Link to="/contact-us" className={`header-nav-link ${isActive('/contact-us') ? 'active' : ''}`}>
            Contact
          </Link>
          <Link to="/regulations" className={`header-nav-link ${isActive('/regulations') ? 'active' : ''}`}>
            Regulations
          </Link>
        </nav>

        <div className="header-actions">
          {user ? (
            <>
              <Link 
                to={`/${user.userType.toLowerCase()}/dashboard`} 
                className="header-button header-dashboard-btn"
              >
                Dashboard
              </Link>
              <button onClick={logout} className="header-button header-logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-button header-login-btn">
                Login
              </Link>
              <Link to="/register" className="header-button header-register-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
