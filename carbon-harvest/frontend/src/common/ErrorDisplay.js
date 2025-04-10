import React from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorDisplay Component - Displays error messages in a consistent format
 * @param {object} props - Component props
 * @param {string} props.message - Error message to display
 * @returns {JSX.Element} Error display component
 */
const ErrorDisplay = ({ message }) => {
    return <div className="alert alert-danger" role="alert">{message}</div>;
};

ErrorDisplay.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorDisplay;
 