import React from 'react';
import PropTypes from 'prop-types';
import './PageLayout.css';

/**
 * PageLayout Component - Provides consistent layout structure for all pages
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.title - Page title
 * @returns {JSX.Element} PageLayout component
 */
const PageLayout = ({ children, title }) => {
  return (
    <div className="page-layout">
      <div className="page-container">
        {title && (
          <div className="page-header">
            <h1 className="page-title">{title}</h1>
          </div>
        )}
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default PageLayout;
