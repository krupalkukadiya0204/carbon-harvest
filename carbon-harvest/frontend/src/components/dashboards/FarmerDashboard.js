import React from 'react';
import DashboardCard from '../shared/DashboardCard';
import './FarmerDashboard.css';

const FarmerDashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Farmer Dashboard</h1>
            </div>

            <div className="dashboard-section">
                <h2 className="dashboard-section-title">Quick Stats</h2>
                <div className="quick-stats">
                    <div className="stat-card">
                        <div className="stat-title">Active Projects</div>
                        <div className="stat-value">3</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-title">Carbon Credits Earned</div>
                        <div className="stat-value">245</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-title">Credits Value (USD)</div>
                        <div className="stat-value">$3,675</div>
                    </div>
                </div>
            </div>

            <div className="dashboard-section">
                <h2 className="dashboard-section-title">Quick Actions</h2>
                <div className="dashboard-grid">
                    <DashboardCard 
                        title="My Projects"
                        description="View and manage your carbon credit projects. Track progress and submit reports."
                        linkText="View Projects"
                        linkTo="/farmer/projects"
                    />
                    <DashboardCard 
                        title="Carbon Credits"
                        description="Track your carbon credit earnings, view transaction history, and manage your portfolio."
                        linkText="View Credits"
                        linkTo="/farmer/credits"
                    />
                    <DashboardCard 
                        title="Reports & Analytics"
                        description="Generate detailed reports, analyze trends, and get insights into your carbon reduction impact."
                        linkText="View Reports"
                        linkTo="/farmer/reports"
                    />
                </div>
            </div>
        </div>
    );
};

export default FarmerDashboard;
