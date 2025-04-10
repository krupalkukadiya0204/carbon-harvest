/**
 * @file Loading Screen Component - Displays animated loading state
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Logo from './Logo';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const StyledLogo = styled(Logo)`
  transform: scale(1.5);
`;

const LoadingText = styled(motion.p)`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  margin: 0;
`;

const LoadingSpinner = styled(motion.div)`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 4px solid ${props => props.color};
  border-top: 4px solid transparent;
  border-radius: 50%;
`;

/**
 * LoadingScreen Component - Displays a loading animation with the app logo
 * @returns {JSX.Element} Loading screen component
 */
const LoadingScreen = ({ message = 'Loading...', showLogo = true, spinnerSize = 50, spinnerColor = 'var(--primary-color)' }) => {
  return (
    <LoadingContainer>
      <LoadingContent>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {showLogo && <StyledLogo />}
        </motion.div>
        
        <LoadingSpinner
          size={spinnerSize}
          color={spinnerColor}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        <LoadingText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </LoadingText>
      </LoadingContent>
    </LoadingContainer>
  );
};

LoadingScreen.propTypes = {
  message: PropTypes.string,
  showLogo: PropTypes.bool,
  spinnerSize: PropTypes.number,
  spinnerColor: PropTypes.string
};

export default LoadingScreen;
