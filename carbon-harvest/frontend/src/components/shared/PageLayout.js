import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import '../../styles/layouts.css';

const PageLayout = ({ children, className = '', fullWidth = false }) => {
  return (
    <div className="page-layout">
      <Header />
      <main className={`page-content ${fullWidth ? 'full-width' : ''} ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fullWidth: PropTypes.bool
};

export default PageLayout;
