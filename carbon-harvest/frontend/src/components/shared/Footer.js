import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Footer.css';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get('/api/site/footer');
        if (response.data.status === 'success') {
          setFooterData(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching footer data:', err);
        setError('Failed to load footer data');
      }
    };

    fetchFooterData();
  }, []);

  if (error) {
    console.error(error);
  }

  // Fallback content if data is not yet loaded
  const defaultContent = {
    legalInfo: {
      privacyPolicy: '/privacy-policy',
      termsOfService: '/terms'
    },
    quickLinks: [
      { title: 'Home', url: '/' },
      { title: 'About', url: '/about' },
      { title: 'Farmers Portal', url: '/farmer-dashboard' },
      { title: 'Industry Portal', url: '/industry-dashboard' },
      { title: 'Regulators Portal', url: '/regulator-dashboard' }
    ],
    contactInfo: {
      email: 'contact@carbonharvest.com'
    }
  };

  const content = footerData || defaultContent;

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading">CarbonHarvest</h3>
          <p className="footer-text">
            Empowering sustainable agriculture through innovative carbon credit solutions.
          </p>
          {content.contactInfo?.email && (
            <p className="footer-contact">
              Contact: <a href={`mailto:${content.contactInfo.email}`} className="footer-link">{content.contactInfo.email}</a>
            </p>
          )}
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <nav className="footer-nav">
            {content.quickLinks?.map((link, index) => (
              <Link key={index} to={link.url} className="footer-link">{link.title}</Link>
            ))}
          </nav>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Legal</h4>
          <nav className="footer-nav">
            {content.legalInfo && (
              <>
                <Link to={content.legalInfo.privacyPolicy} className="footer-link">Privacy Policy</Link>
                <Link to={content.legalInfo.termsOfService} className="footer-link">Terms of Service</Link>
              </>
            )}
          </nav>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Admin</h4>
          <nav className="footer-nav">
            <Link to="/admin/login" className="footer-link">Admin Login</Link>
            <Link to="/admin/dashboard" className="footer-link">Admin Dashboard</Link>
          </nav>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-content">
          <p className="footer-copyright">
            © {new Date().getFullYear()} CarbonHarvest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
