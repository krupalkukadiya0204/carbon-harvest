import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes, FaSearch, FaUser, FaBell } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import '../../styles/headers.css';

/**
 * MainHeader Component - Professional main navigation header
 * @returns {JSX.Element} The MainHeader component
 */
const MainHeader = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simulated notifications - replace with actual API call
    setNotifications([
      { id: 1, text: 'New carbon credit opportunity available', isNew: true },
      { id: 2, text: 'Your project verification is complete', isNew: true },
      { id: 3, text: 'Market report for Q1 2025 is ready', isNew: false }
    ]);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark-mode');
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const navigationLinks = [
    { to: '/', label: 'Home' },
    { to: '/marketplace', label: 'Marketplace' },
    { to: '/article64', label: 'Article 6.4' },
    { to: '/blog', label: 'Blog' },
    { to: '/news', label: 'News' },
    { to: '/insurance', label: 'Insurance' },
    { to: '/support', label: 'Support' }
  ];
  };

  const navLinks = [
    { to: '/about-us', label: 'About Us' },
    { to: '/contact-us', label: 'Contact Us' },
    { to: '/regulations', label: 'How it Works' },
    { to: '/marketplace', label: 'Marketplace' },
    { to: '/resources', label: 'Resources' },
    ...(user?.userType === 'Farmer' ? [{ to: '/farmer/dashboard', label: 'Farmer Dashboard' }] : []),
    ...(user?.userType === 'Industry' ? [{ to: '/industry/dashboard', label: 'Industry Dashboard' }] : []),
    ...(user?.userType === 'Regulator' ? [{ to: '/admin/dashboard', label: 'Admin Dashboard' }] : []),
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      className={`main-header ${isScrolled ? 'scrolled' : ''} ${isDarkMode ? 'dark' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="header-container">
        <div className="header-logo">
          <Link to="/" className="logo-link">
            <motion.img
              src={process.env.PUBLIC_URL + '/images/logo.png'}
              alt="CarbonHarvest Logo"
              width="120"
              height="32"
              loading="eager"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </Link>
        </div>

        <div className="header-search">
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                className="search-container"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '300px' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="text"
                  placeholder="Search projects, resources..."
                  className="search-input"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <button className="icon-button" onClick={toggleSearch}>
            <FaSearch />
          </button>
        </div>
        
        <nav className={`header-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="auth-buttons">
            {!user ? (
              <>
                <Link to="/register" className="register-btn">Register</Link>
                <Link to="/login" className="login-btn">Login</Link>
              </>
            ) : (
              <div className="user-menu">
                <Link to="/profile" className="profile-link">
                  <img
                    src={user.profileImage || `${process.env.PUBLIC_URL}/images/default-avatar.png`}
                    alt="Profile"
                    className="profile-image"
                  />
                  <span>{user.name}</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default MainHeader;
