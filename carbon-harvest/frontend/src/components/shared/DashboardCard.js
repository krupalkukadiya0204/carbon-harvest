import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './DashboardCard.css';

const DashboardCard = ({ title, description, linkText, linkTo }) => (
    <div className="dashboard-card">
        <h3 className="dashboard-card-title">{title}</h3>
        <p className="dashboard-card-description">{description}</p>
        <Link to={linkTo} className="dashboard-card-link">{linkText}</Link>
    </div>
);

DashboardCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired
};

export default DashboardCard;