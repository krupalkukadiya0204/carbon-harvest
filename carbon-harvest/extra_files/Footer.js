/**
 * @file Footer.js - Site-wide footer component
 * @module Footer
 * @description A responsive and modular footer component with branding, navigation,
 * newsletter subscription, and social links sections.
 */

import React, { useState, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import FooterLinks from './footer/FooterLinks';
import SocialLinks from './footer/SocialLinks';
import { validateEmail } from '../utils/validation';
import './Footer.css';

// Newsletter subscription states
const NEWSLETTER_STATES = {
  IDLE: 'idle',
  SUBSCRIBING: 'subscribing',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Configuration constants
const CONFIG = {
  SUBSCRIPTION_DELAY: 2000,
  COMPANY_NAME: 'CarbonHarvest',
  BRAND_DESCRIPTION: 'Empowering sustainable agriculture through blockchain-verified carbon credits. Join us in creating a greener, more prosperous future for Indian agriculture.'
};

// Navigation and resource links organized by section
export const FOOTER_LINKS = {
  farmers: [
    { text: 'Get Started', url: '/farmer/onboarding' },
    { text: 'Success Stories', url: '/farmer/stories' },
    { text: 'Training Videos', url: '/farmer/training' },
    { text: 'Carbon Calculator', url: '/farmer/calculator' }
  ],
  industries: [
    { text: 'Compliance Guide', url: '/industry/compliance' },
    { text: 'Credit Trading', url: '/marketplace' },
    { text: 'ESG Reporting', url: '/industry/esg' },
    { text: 'Partner Network', url: '/industry/partners' }
  ],
  resources: [
    { text: 'Documentation', url: '/docs' },
    { text: 'API Access', url: '/api-docs' },
    { text: 'Case Studies', url: '/case-studies' },
    { text: 'Knowledge Base', url: '/knowledge-base' }
  ]
};

/**
 * Footer Component - Site-wide footer with navigation and social links
 * @component
 * @returns {JSX.Element} Footer component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState(NEWSLETTER_STATES.IDLE);

  // Handle email input changes and reset error state
  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
    if (subscribeStatus === NEWSLETTER_STATES.ERROR) {
      setSubscribeStatus(NEWSLETTER_STATES.IDLE);
    }
  }, [subscribeStatus]);

  // Handle newsletter form submission
  const handleNewsletterSubmit = useCallback((e) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setSubscribeStatus(NEWSLETTER_STATES.ERROR);
      return;
    }

    setSubscribeStatus(NEWSLETTER_STATES.SUBSCRIBING);
    
    // Simulated API call - Replace with actual API integration
    setTimeout(() => {
      try {
        // Newsletter subscription logic would go here
        setSubscribeStatus(NEWSLETTER_STATES.SUCCESS);
        setEmail('');
      } catch (error) {
        setSubscribeStatus(NEWSLETTER_STATES.ERROR);
        console.error('Newsletter subscription failed:', error);
      }
    }, CONFIG.SUBSCRIPTION_DELAY);
  }, [email]);

  // Render newsletter status message
  const renderNewsletterStatus = () => {
    switch (subscribeStatus) {
      case NEWSLETTER_STATES.SUCCESS:
        return <div className="newsletter-status success">Thank you for subscribing!</div>;
      case NEWSLETTER_STATES.ERROR:
        return <div className="newsletter-status error">Please enter a valid email address.</div>;
      default:
        return null;
    }
  };

  return (
    <footer className="footer" role="contentinfo">

      <div className="footer-content">
        {/* Branding Section */}
        <div className="footer-section brand-section">
          <Link to="/" className="footer-logo" aria-label="Home">
            <img 
              src="/logo.png" 
              alt={`${CONFIG.COMPANY_NAME} Logo`}
              width="120" 
              height="35" 
              loading="lazy"
            />
          </Link>
          <p className="brand-description">{CONFIG.BRAND_DESCRIPTION}</p>
          
          {/* Newsletter Section */}
          <div className="newsletter-section">
            <h3>Stay Updated</h3>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  aria-label="Email for newsletter"
                  disabled={subscribeStatus === NEWSLETTER_STATES.SUBSCRIBING}
                  className={subscribeStatus === NEWSLETTER_STATES.ERROR ? 'error' : ''}
                />
                <button 
                  type="submit"
                  disabled={subscribeStatus === NEWSLETTER_STATES.SUBSCRIBING}
                  className={`subscribe-button ${subscribeStatus === NEWSLETTER_STATES.SUBSCRIBING ? 'loading' : ''}`}
                  aria-label={subscribeStatus === NEWSLETTER_STATES.SUBSCRIBING ? 'Subscribing...' : 'Subscribe to newsletter'}
                >
                  {subscribeStatus === NEWSLETTER_STATES.SUBSCRIBING ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {renderNewsletterStatus()}
            </form>
          </div>
        </div>

        {/* Navigation Links Section */}
        <FooterLinks links={FOOTER_LINKS} />

        {/* Social Links Section */}
        <div className="footer-section social-section">
          <SocialLinks />
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="footer-legal">
            <span>&copy; {currentYear} {CONFIG.COMPANY_NAME}. All rights reserved.</span>
            <nav className="legal-links" aria-label="Legal links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </nav>
          </div>
          <div className="footer-certifications" aria-label="Certifications">
            <span>ISO 27001 Certified</span>
            <span>Carbon Neutral</span>
          </div>
        </div>
      </div>
    </footer>
  );

};

export default memo(Footer);
