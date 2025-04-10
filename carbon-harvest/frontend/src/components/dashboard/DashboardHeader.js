import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import '../../styles/headers.css';

const DashboardHeader = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const userType = user?.userType?.toLowerCase() || '';

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Get base path for the user type (farmer, industry, regulator)
    const getBasePath = () => {
        if (!userType) return '';
        return `/${userType.toLowerCase()}`;
    };

    // Define navigation links based on user type
    const getNavLinks = () => {
        const basePath = getBasePath();
        if (!basePath) return [];
        
        const links = [
            { to: `${basePath}/dashboard`, label: 'Dashboard' },
            { to: `${basePath}/reports`, label: 'Reports' },
            { to: `${basePath}/settings`, label: 'Settings' }
        ];

        return links;
    };

    const navLinks = getNavLinks();

    return (
        <header className="dashboard-header">
            <div className="dashboard-header-container">
                <div className="dashboard-logo">
                    <Link to={`${getBasePath()}/dashboard`}>CarbonHarvest</Link>
                </div>
                
                <nav className="dashboard-nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="user-section">
                    {user && (
                        <>
                            <span className="user-name">
                                Welcome, {user?.name || 'User'}
                            </span>
                            <div 
                                onClick={() => {
                                    const basePath = getBasePath();
                                    if (basePath) {
                                        navigate(`${basePath}/profile`);
                                    } else {
                                        console.error('User type not found');
                                    }
                                }} 
                                className="profile-link"
                                title="View Profile"
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        const basePath = getBasePath();
                                        if (basePath) {
                                            navigate(`${basePath}/profile`);
                                        } else {
                                            console.error('User type not found');
                                        }
                                    }
                                }}
                            >
                                <FaUser />
                            </div>
                            <button 
                                onClick={handleLogout} 
                                className="logout-button"
                                title="Logout"
                            >
                                <FaSignOutAlt />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
