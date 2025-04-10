import React from 'react';
import PropTypes from 'prop-types';
import { FaLeaf, FaChartLine, FaUserFriends } from 'react-icons/fa';

const CarbonStatsBanner = ({ stats }) => (
    <div className="carbon-stats-banner">
        <div className="stat">
            <FaLeaf className="stat-icon" />
            <span>{stats.totalCarbon}</span> tons CO₂ offset
        </div>
        <div className="stat">
            <FaChartLine className="stat-icon" />
            <span>{stats.activeProjects}</span> active projects
        </div>
        <div className="stat">
            <FaUserFriends className="stat-icon" />
            <span>{stats.farmersEngaged}</span> farmers engaged
        </div>
    </div>
);

CarbonStatsBanner.propTypes = {
    stats: PropTypes.shape({
        totalCarbon: PropTypes.number.isRequired,
        activeProjects: PropTypes.number.isRequired,
        farmersEngaged: PropTypes.number.isRequired
    }).isRequired
};

export default React.memo(CarbonStatsBanner);
