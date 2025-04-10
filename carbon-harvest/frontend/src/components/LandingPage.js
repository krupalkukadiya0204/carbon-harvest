/**
* @file LandingPage.js - Main landing page component for Carbon Harvest
* @module LandingPage
* @description A modern, responsive landing page showcasing Carbon Harvest's key features,
* success stories, and value proposition for sustainable agriculture and carbon trading.
*/

import React from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import MarketplacePreview from './MarketplacePreview';
import AboutPreview from './AboutPreview';
import ProjectsShowcase from './ProjectsShowcase';
import ContactForm from './ContactForm';
import '../styles/LandingPage.css';
import hero from '../assets/images/hero.jpg';
import joinUs from '../assets/images/join-us-bg.jpg';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Hero />

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <div className='section-content'>
                        <p>
                            CarbonHarvest simplifies carbon credit trading. Farmers adopt sustainable practices, industries invest in these efforts, and regulators provide oversight. Our platform connects them all, ensuring transparency and promoting sustainability.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Impact Section */}
            <section className="our-impact-section">
                <div className="container">
                    <h2 className="section-title">Our Impact</h2>
                    <div className='section-content'>
                        <p>
                            We are dedicated to making a tangible difference in the fight against climate change. By fostering sustainable agriculture, supporting the growth of carbon sequestration, and connecting stakeholders in the carbon credit market, we are working towards a greener future.
                        </p>
                    </div>
                </div>
            </section>
            {/* Visuals Section */}
            <section className="visuals-section">
                <div className="container">
                    <img src={hero} alt="Carbon Harvest Hero" className="full-width-image" />
                </div>
            </section>
            <MarketplacePreview />
            <AboutPreview />
            <ProjectsShowcase />
            {/* Join the Movement Section */}
            <section className="join-movement-section" style={{ backgroundImage: `url(${joinUs})` }}>
                <div className="container">
                    <h2 className="section-title">Join the Movement</h2>
                    <p className='section-content'>Be part of the solution. Register with CarbonHarvest and start making a difference today.</p>
                    <Link to="/register" className="btn btn-primary">Register Now</Link>
                </div>
            </section>
            {/* Our Partners Section */}
            <section className="our-partners-section"><div className="container"> <h2 className="section-title">Our Partners</h2>
                    <p className='section-content'>We collaborate with leading organizations and experts to drive innovation in sustainable agriculture and carbon trading.</p></div></section>
            <ContactForm />
        </div>
    );
};

export default LandingPage;
