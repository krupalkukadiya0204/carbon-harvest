/**
 * @file App.js - Root component for Carbon Harvest application
 * @module App
 */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SnackbarProvider } from 'notistack';

// Profile Component
import Profile from './components/profile/Profile';

// Component imports
import LoadingScreen from './components/LoadingScreen';
import FarmerDashboard from './components/dashboards/FarmerDashboard';
import FarmerProjects from './components/farmer/FarmerProjects';
import FarmerCredits from './components/farmer/FarmerCredits';
import FarmerReports from './components/farmer/FarmerReports';
import IndustryDashboard from './components/dashboards/IndustryDashboard';
import RegulatorDashboard from './components/dashboards/RegulatorDashboard';
import Registration from './components/Registration';
import Login from './components/Login';
import PublicLayout from './components/layouts/PublicLayout';
import LandingPage from './components/LandingPage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import FarmerOnboarding from './components/onboarding/FarmerOnboarding';
import IndustryOnboarding from './components/onboarding/IndustryOnboarding';
import RegulatorOnboarding from './components/onboarding/RegulatorOnboarding';
import NotFound from './components/NotFound';
import Regulations from './components/Regulations';
import GamificationDashboard from './components/Gamification/GamificationDashboard';
import DashboardLayout from './components/dashboard/DashboardLayout';
// Admin components
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminRoute from './components/admin/AdminRoute';
// Context imports
import { AuthContext, AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProvider } from './context/AppContext';

// New component imports
import BlogSystem from './components/Blog/BlogSystem';
import NewsRoom from './components/News/NewsRoom';
import InsurancePortal from './components/Insurance/InsurancePortal';
import CropMarketplace from './components/Marketplace/CropMarketplace';
import ProjectCycle from './components/Article64/ProjectCycle';
import SupportPortal from './components/Support/SupportPortal';

// Styles
import './App.css';

/**
 * PrivateRoute Component - Higher-order component for route protection
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to protect
 * @returns {JSX.Element} Protected route or login redirect
 */
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

// Animation configuration for smooth page transitions
const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: 'easeIn'
    }
  }
};

/**
 * AppContent Component - Main content wrapper with routing and animations
 * @returns {JSX.Element} Main application content including header, routes, and footer
 */
const AppContent = () => {
  const location = useLocation();
  useContext(AuthContext); // Keep context for future use

  // Helper function to wrap content in appropriate layout
  const wrapInLayout = (Component, isPublic = false) => {
    const content = (
      <motion.div
        key={location.pathname}
        variants={pageTransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {Component}
      </motion.div>
    );

    return isPublic ? (
      <PublicLayout>{content}</PublicLayout>
    ) : (
      <DashboardLayout>{content}</DashboardLayout>
    );
  };

  const { mode } = useTheme();

  return (
    <div className={`app ${mode}`}>
      <AnimatePresence mode="wait">
        <Routes>
              {/* Public Routes */}
              <Route path="/" element={wrapInLayout(<LandingPage />, true)} />
              <Route path="/about-us" element={wrapInLayout(<AboutUs />, true)} />
              <Route path="/contact-us" element={wrapInLayout(<ContactUs />, true)} />
              <Route path="/register" element={wrapInLayout(<Registration />, true)} />
              <Route path="/login" element={wrapInLayout(<Login />, true)} />
              <Route path="/regulations" element={wrapInLayout(<Regulations />, true)} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={wrapInLayout(<AdminLogin />, true)} />
              <Route path="/admin/dashboard" element={
                <AdminRoute>
                  {wrapInLayout(<AdminDashboard />)}
                </AdminRoute>
              } />

              {/* Protected Onboarding Routes */}
              <Route path="/onboarding/farmer" element={
                <PrivateRoute>
                  {wrapInLayout(<FarmerOnboarding />)}
                </PrivateRoute>
              } />
              <Route path="/onboarding/industry" element={
                <PrivateRoute>
                  {wrapInLayout(<IndustryOnboarding />)}
                </PrivateRoute>
              } />
              <Route path="/onboarding/regulator" element={
                <PrivateRoute>
                  {wrapInLayout(<RegulatorOnboarding />)}
                </PrivateRoute>
              } />

              {/* Protected Dashboard Routes */}
              {/* Farmer Routes */}
              <Route path="/farmer/dashboard" element={
                <PrivateRoute>
                  {wrapInLayout(<FarmerDashboard />)}
                </PrivateRoute>
              } />
              <Route path="/farmer/projects" element={
                <PrivateRoute>
                  {wrapInLayout(<FarmerProjects />)}
                </PrivateRoute>
              } />
              <Route path="/farmer/credits" element={
                <PrivateRoute>
                  {wrapInLayout(<FarmerCredits />)}
                </PrivateRoute>
              } />
              <Route path="/farmer/reports" element={
                <PrivateRoute>
                  {wrapInLayout(<FarmerReports />)}
                </PrivateRoute>
              } />
              
              {/* Industry & Regulator Routes */}
              <Route path="/industry/dashboard" element={
                <PrivateRoute>
                  {wrapInLayout(<IndustryDashboard />)}
                </PrivateRoute>
              } />
              <Route path="/regulator/dashboard" element={
                <PrivateRoute>
                  {wrapInLayout(<RegulatorDashboard />)}
                </PrivateRoute>
              } />
              <Route path="/gamification" element={
                <PrivateRoute>
                  {wrapInLayout(<GamificationDashboard />)}
                </PrivateRoute>
              } />

              {/* Profile Routes */}
              <Route path="/farmer/profile" element={
                <PrivateRoute>
                  {wrapInLayout(<Profile />)}
                </PrivateRoute>
              } />
              <Route path="/industry/profile" element={
                <PrivateRoute>
                  {wrapInLayout(<Profile />)}
                </PrivateRoute>
              } />
              <Route path="/regulator/profile" element={
                <PrivateRoute>
                  {wrapInLayout(<Profile />)}
                </PrivateRoute>
              } />

              {/* New Routes */}
              <Route path="/marketplace" element={
                <PrivateRoute>
                  {wrapInLayout(<CropMarketplace />)}
                </PrivateRoute>
              } />
              <Route path="/article64" element={
                <PrivateRoute>
                  {wrapInLayout(<ProjectCycle />)}
                </PrivateRoute>
              } />
              <Route path="/blog" element={wrapInLayout(<BlogSystem />, true)} />
              <Route path="/news" element={wrapInLayout(<NewsRoom />, true)} />
              <Route path="/insurance" element={
                <PrivateRoute>
                  {wrapInLayout(<InsurancePortal />)}
                </PrivateRoute>
              } />
              <Route path="/support" element={wrapInLayout(<SupportPortal />, true)} />

              {/* Catch-all route for 404 */}
              <Route path="*" element={wrapInLayout(<NotFound />, true)} />
            </Routes>
      </AnimatePresence>
    </div>
  );
};

/**
 * App Component - Main application component with loading state, theme, and authentication providers
 * @returns {JSX.Element} Root application component
 */
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <ThemeProvider>
        <CssBaseline />
        <AuthProvider>
          <AppProvider>
            <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
              <AppContent />
            </SnackbarProvider>
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
export { PrivateRoute, App };