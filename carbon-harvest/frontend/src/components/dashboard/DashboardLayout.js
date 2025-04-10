import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../../context/AuthContext';
import DashboardHeader from './DashboardHeader';
import DashboardFooter from './DashboardFooter';
import '../../styles/layouts.css';

const DashboardLayout = ({ children }) => {
    const { user } = useContext(AuthContext);

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="dashboard-layout">
            <DashboardHeader />
            <main className="dashboard-main">
                {children}
            </main>
            <DashboardFooter />
        </div>
    );
};

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DashboardLayout;
