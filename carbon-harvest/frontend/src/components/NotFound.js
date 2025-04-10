/**
 * @file NotFound Component - 404 error page
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './NotFound.css';

/**
 * NotFound Component - Displays 404 error page when route is not found
 * @returns {JSX.Element} 404 error page component
 */
const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="home-link">Go back to Home</Link>
        </div>
    );
};

NotFound.propTypes = {
  message: PropTypes.string,
  showHomeLink: PropTypes.bool,
  customRedirectPath: PropTypes.string
};

NotFound.defaultProps = {
  message: 'Sorry, the page you are looking for does not exist.',
  showHomeLink: true,
  customRedirectPath: '/'
};

export default NotFound;
