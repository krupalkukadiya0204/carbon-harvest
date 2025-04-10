import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import heroImage from '../assets/images/hero.jpg';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={`hero ${scrolled ? 'scrolled' : ''}`}>
      <div className="hero-background">
        <img src={heroImage} alt="Sustainable Agriculture" className="hero-image" />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="highlight">Transform</span> Agriculture.<br />
          <span className="highlight">Combat</span> Climate Change.
        </h1>
        <p className="hero-subtitle">
          Join the sustainable farming revolution with cutting-edge carbon credit technology.
          Together, we can build a greener future.
        </p>
        <div className="hero-cta">
          <Link to="/marketplace" className="btn btn-primary">
            Explore Marketplace
          </Link>
          <Link to="/about-us" className="btn btn-secondary">
            Learn More
          </Link>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">1M+</span>
            <span className="stat-label">Hectares Protected</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">500K</span>
            <span className="stat-label">Carbon Credits Issued</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Farmers Empowered</span>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
