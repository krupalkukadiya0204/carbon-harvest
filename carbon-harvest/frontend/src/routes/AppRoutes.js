import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Layout Components
import MainLayout from '../components/layouts/MainLayout';
import DashboardLayout from '../components/layouts/DashboardLayout';

// Page Components
import LandingPage from '../components/LandingPage';
import BlogSystem from '../components/Blog/BlogSystem';
import NewsRoom from '../components/News/NewsRoom';
import InsurancePortal from '../components/Insurance/InsurancePortal';
import CropMarketplace from '../components/Marketplace/CropMarketplace';
import ProjectCycle from '../components/Article64/ProjectCycle';
import SupportPortal from '../components/Support/SupportPortal';

// Auth Components
import Login from '../components/auth/Login';
import Registration from '../components/auth/Registration';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="news" element={<NewsRoom />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
      </Route>

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="marketplace" element={<CropMarketplace />} />
        <Route path="article64" element={<ProjectCycle />} />
        <Route path="blog" element={<BlogSystem />} />
        <Route path="insurance" element={<InsurancePortal />} />
        <Route path="support" element={<SupportPortal />} />
        
        {/* User Dashboard Routes */}
        <Route path="dashboard">
          <Route path="profile" element={<UserProfile />} />
          <Route path="projects" element={<ProjectsManagement />} />
          <Route path="transactions" element={<TransactionHistory />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
