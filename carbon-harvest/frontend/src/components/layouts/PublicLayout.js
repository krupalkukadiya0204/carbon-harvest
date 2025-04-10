import React from 'react';
import PropTypes from 'prop-types';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

const PublicLayout = ({ children }) => {
  return (
    <div className="public-layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

PublicLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default PublicLayout;
