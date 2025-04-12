import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSeedling, FaArrowRight, FaPlay } from 'react-icons/fa';
import { FullWidthSection } from './layouts/FullWidthLayout';
import VideoSection from './VideoSection';

const HeroSection = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleLearnMore = () => {
    setShowVideo(true);
    document.getElementById('video-section').scrollIntoView({ behavior: 'smooth' });
  };

  const styles = {
    heroSection: {
      minHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(2rem, 5vw, 4rem) 0',
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
      position: 'relative',
      overflow: 'hidden',
    },
    heroContent: {
      maxWidth: '1200px',
      width: '100%',
      margin: '0 auto',
      padding: '0 clamp(1rem, 5vw, 2rem)',
      textAlign: 'center',
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      borderRadius: '2rem',
      background: 'var(--primary-color)',
      color: 'white',
      fontSize: '1rem',
      marginBottom: '2rem',
    },
    heading: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: '700',
      lineHeight: '1.2',
      marginBottom: '1.5rem',
      color: 'var(--text-primary)',
    },
    highlight: {
      color: 'var(--primary-color)',
    },
    description: {
      fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
      maxWidth: '800px',
      margin: '0 auto 2rem',
      color: 'var(--text-secondary)',
      lineHeight: '1.6',
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      flexWrap: 'wrap',
      marginBottom: '4rem',
    },
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '1rem 2rem',
      borderRadius: '0.5rem',
      fontWeight: '500',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
    },
    primaryButton: {
      background: 'var(--primary-color)',
      color: 'white',
    },
    secondaryButton: {
      background: 'transparent',
      border: '2px solid var(--primary-color)',
      color: 'var(--primary-color)',
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      flexWrap: 'wrap',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    statBox: {
      textAlign: 'center',
      minWidth: '180px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      padding: '1.5rem',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    statValue: {
      display: 'block',
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      color: 'var(--primary-color)',
      marginBottom: '0.5rem',
      fontWeight: '700',
    },
    statLabel: {
      color: 'var(--text-secondary)',
      fontSize: '1rem',
    },
  };

  return (
    <>
      <FullWidthSection>
        <div style={styles.heroSection}>
          <div style={styles.heroContent}>
            <div style={styles.badge}>
              <FaSeedling />
              <span>Carbon Harvest</span>
            </div>
            <h1 style={styles.heading}>
              Empowering Farmers Through
              <span style={styles.highlight}> Carbon Credits</span>
            </h1>
            <p style={styles.description}>
              Join Indias first platform connecting farmers with the global carbon market.
              Turn sustainable farming into profitable opportunities.
            </p>

            <div style={styles.actions}>
              <button
                onClick={handleGetStarted}
                style={{ ...styles.button, ...styles.primaryButton }}
              >
                Get Started
                <FaArrowRight />
              </button>
              <button
                onClick={handleLearnMore}
                style={{ ...styles.button, ...styles.secondaryButton }}
              >
                <FaPlay style={{ fontSize: '0.875rem' }} />
                How It Works
              </button>
            </div>
          </div>

          <div style={styles.statsContainer}>
            <div style={styles.statBox}>
              <strong style={styles.statValue}>50,000+</strong>
              <span style={styles.statLabel}>Farmers</span>
            </div>
            <div style={styles.statBox}>
              <strong style={styles.statValue}>₹100Cr+</strong>
              <span style={styles.statLabel}>Credits Traded</span>
            </div>
            <div style={styles.statBox}>
              <strong style={styles.statValue}>1.2M</strong>
              <span style={styles.statLabel}>CO₂ Reduced</span>
            </div>
          </div>
        </div>
      </FullWidthSection>
      <div>
        {showVideo && <VideoSection />}
      </div>
    </>
  );
};

export default HeroSection;