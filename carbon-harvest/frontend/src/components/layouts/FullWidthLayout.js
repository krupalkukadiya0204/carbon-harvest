import React from 'react';
import PropTypes from 'prop-types';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
    margin: 0,
    padding: 0,
    overflowX: 'hidden',
    backgroundColor: 'var(--neutral-50)',
  },
  main: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: 0,
    paddingTop: 'var(--header-height)',
    gap: 'var(--spacing-2xl)',
  },
  fullWidthSection: {
    width: '100vw',
    marginLeft: '50%',
    transform: 'translateX(-50%)',
    position: 'relative',
    padding: 'var(--spacing-2xl) 0',
  },
  contentContainer: {
    width: '100%',
    maxWidth: 'var(--container-max-width)',
    margin: '0 auto',
    padding: '0 var(--spacing-md)',
    boxSizing: 'border-box',
  }
};

const FullWidthSection = ({ children, background, className = '' }) => (
  <div 
    style={{ 
      ...styles.fullWidthSection,
      background: background || 'transparent'
    }}
    className={className}
  >
    <div style={styles.contentContainer}>
      {children}
    </div>
  </div>
);

const FullWidthLayout = ({ children }) => {
  return (
    <div style={styles.layout}>
      <Header />
      <main style={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

FullWidthLayout.propTypes = {
  children: PropTypes.node.isRequired
};

FullWidthSection.propTypes = {
  children: PropTypes.node.isRequired,
  background: PropTypes.string,
  className: PropTypes.string
};

export { FullWidthLayout as default, FullWidthSection };
