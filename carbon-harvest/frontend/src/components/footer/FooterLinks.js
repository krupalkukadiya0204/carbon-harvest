import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FooterLinks = ({ links }) => (
    <div className="footer-section links-section">
        <div className="footer-links-grid">
            <div className="footer-link-column">
                <h3>For Farmers</h3>
                <ul>
                    {links.farmers.map(link => (
                        <li key={link.url}>
                            <Link to={link.url}>{link.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="footer-link-column">
                <h3>For Industries</h3>
                <ul>
                    {links.industries.map(link => (
                        <li key={link.url}>
                            <Link to={link.url}>{link.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="footer-link-column">
                <h3>Resources</h3>
                <ul>
                    {links.resources.map(link => (
                        <li key={link.url}>
                            <Link to={link.url}>{link.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

FooterLinks.propTypes = {
    links: PropTypes.shape({
        farmers: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })).isRequired,
        industries: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })).isRequired,
        resources: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })).isRequired
    }).isRequired
};

export default React.memo(FooterLinks);
