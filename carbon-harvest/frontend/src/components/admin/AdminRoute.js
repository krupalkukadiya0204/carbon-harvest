import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    // Check if user is logged in and is a Regulator
    if (!token || !user || user.userType !== 'Regulator') {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

// Define prop types
AdminRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default AdminRoute;
