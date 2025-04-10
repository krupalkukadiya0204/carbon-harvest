/**
 * @file Logo.js - Brand logo component for Carbon Harvest
 * @module Logo
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled components for logo elements
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #2ecc71, #27ae60);
    border-radius: 50%;
    transition: transform 0.2s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 70%;
    height: 70%;
    top: 15%;
    left: 15%;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z'/%3E%3C/svg%3E") center/contain no-repeat;
  }
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  user-select: none;
`;

/**
 * Logo Component - Displays the application brand logo with icon and text
 * @component
 * @param {object} props - Component properties
 * @param {string} [props.className] - Optional CSS class name for styling
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Rendered logo
 */
const Logo = ({ 
  className = ''
}) => {
  return (
    <LogoContainer className={className}>
      <LogoIcon />
      <LogoText>CarbonHarvest</LogoText>
    </LogoContainer>
  );
};

Logo.propTypes = {
  className: PropTypes.string
};

export default Logo;
