/**
 * @file validation.js - Utility functions for form validation
 */

/**
 * Validates an email address
 * @param {string} email - The email address to validate
 * @returns {boolean} True if email is valid, false otherwise
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Additional validation functions can be added here as needed
 */
