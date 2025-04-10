import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import '../../styles/layouts.css';

/**
 *
 * @param root0
 * @param root0.children
 * @param root0.title
 * @param root0.subtitle
 * @param root0.backgroundPattern
 * @param root0.fullWidth
 */
const PageLayout = ({ 
  children, 
  title, 
  subtitle, 
  backgroundPattern = true,
  fullWidth = false 
}) => {
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.2 }
    },
    exit: { opacity: 0 }
  };

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div 
      className={`page-layout ${fullWidth ? 'full-width' : ''}`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {backgroundPattern && (
        <div className="background-pattern">
          <div className="pattern-overlay" />
        </div>
      )}

      <div className="page-content">
        {(title || subtitle) && (
          <motion.header 
            className="page-header"
            variants={headerVariants}
          >
            {title && <h1 className="page-title">{title}</h1>}
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </motion.header>
        )}

        <div className="page-body">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  backgroundPattern: PropTypes.bool,
  fullWidth: PropTypes.bool
};

PageLayout.defaultProps = {
  subtitle: '',
  backgroundPattern: '',
  fullWidth: false
};

export default PageLayout;
