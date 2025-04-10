/**
 * @file LandingPage.js - Main landing page component for Carbon Harvest
 * @module LandingPage
 * @description A modern, responsive landing page showcasing Carbon Harvest's key features,
 * success stories, and value proposition for sustainable agriculture and carbon trading.
 */

import React from 'react';
import Hero from './Hero';
import MarketplacePreview from './MarketplacePreview';
import AboutPreview from './AboutPreview';
import ProjectsShowcase from './ProjectsShowcase';
import ContactForm from './ContactForm';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Hero />
      <MarketplacePreview />
      <AboutPreview />
      <ProjectsShowcase />
      <ContactForm />
    </div>
  );
};

export default LandingPage;
