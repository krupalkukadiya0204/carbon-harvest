import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardFooter.css';

const DashboardFooter = () => {
    return (
        <footer className="dashboard-footer">
            <div className="dashboard-footer-container">
                <div className="footer-links">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Service</Link>
                    <Link to="/help">Help Center</Link>
                </div>
                <div className="footer-copyright">
                    © {new Date().getFullYear()} CarbonHarvest. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default DashboardFooter;
