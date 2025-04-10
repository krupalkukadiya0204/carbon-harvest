import React from 'react';
import { Link } from 'react-router-dom';
import './MainFooter.css';

const MainFooter = () => {
  const footerLinks = {
    about: [
      { to: '/about-us', label: 'About Us' },
      { to: '/contact-us', label: 'Contact Us' },
      { to: '/regulations', label: 'How it Works' },
      { to: '/our-team', label: 'Our Team' },
      { to: '/impact', label: 'Our Impact' },
    ],
    services: [
      { to: '/marketplace', label: 'Carbon Marketplace' },
      { to: '/article64', label: 'Article 6.4' },
      { to: '/insurance', label: 'Insurance' },
      { to: '/support', label: 'Support Portal' },
    ],
    resources: [
      { to: '/blog', label: 'Blog' },
      { to: '/news', label: 'News Room' },
      { to: '/help', label: 'Help Center' },
      { to: '/documentation', label: 'Documentation' },
      { to: '/faq', label: 'FAQ' },
    ],
    legal: [
      { to: '/privacy-policy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms of Service' },
      { to: '/disclaimer', label: 'Disclaimer' },
      { to: '/data-policy', label: 'Data Policy' },
      { to: '/carbon-policy', label: 'Carbon Credit Policy' },
    ],
    social: [
      { to: 'https://twitter.com/carbonharvest', label: 'Twitter', icon: 'twitter' },
      { to: 'https://facebook.com/carbonharvest', label: 'Facebook', icon: 'facebook' },
      { to: 'https://linkedin.com/company/carbonharvest', label: 'LinkedIn', icon: 'linkedin' },
      { to: 'https://instagram.com/carbonharvest', label: 'Instagram', icon: 'instagram' },
    ],
  };

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-newsletter">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest updates on carbon trading and sustainable agriculture.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img
                src={process.env.PUBLIC_URL + '/images/logo.png'}
                alt="CarbonHarvest Logo"
                width="150"
                height="40"
              />
            </Link>
            <p className="footer-description">
              Empowering sustainable agriculture through blockchain-verified carbon credits.
              Join us in creating a greener, more prosperous future for Indian agriculture.
            </p>
          </div>

          <div className="footer-links-section">
            <div className="footer-links-column">
              <h3>About</h3>
              <ul>
                {footerLinks.about.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Legal</h3>
              <ul>
                {footerLinks.legal.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Resources</h3>
              <ul>
                {footerLinks.resources.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} CarbonHarvest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
