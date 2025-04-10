import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FullWidthSection } from './layouts/FullWidthLayout';

const styles = {
  section: {
    padding: 'clamp(3rem, 8vw, 6rem) 0',
    background: 'var(--bg-secondary)',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'clamp(2rem, 5vw, 4rem)',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 clamp(1rem, 5vw, 2rem)',
  },
  videoWrapper: {
    position: 'relative',
    paddingTop: '56.25%', // 16:9 aspect ratio
    width: '100%',
    background: '#000',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 0,
  },
  info: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    color: 'var(--text-primary)',
    marginBottom: '1.5rem',
    fontWeight: '600',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.1rem',
    color: 'var(--text-secondary)',
  },
  icon: {
    color: 'var(--primary-color)',
    fontSize: '1.25rem',
  },
};

const VideoSection = () => {
  return (
    <FullWidthSection>
      <div style={styles.section}>
        <div style={styles.container}>
          <div style={styles.videoWrapper}>
            <iframe
              src="https://www.youtube.com/embed/your_video_id"
              title="Understanding Carbon Credits and Regulations"
              style={styles.iframe}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div style={styles.info}>
            <h3 style={styles.heading}>What You Will Learn:</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <FaCheckCircle style={styles.icon} />
                How carbon credits are generated and verified
              </li>
              <li style={styles.listItem}>
                <FaCheckCircle style={styles.icon} />
                Key regulations and compliance requirements
              </li>
              <li style={styles.listItem}>
                <FaCheckCircle style={styles.icon} />
                Step-by-step registration process
              </li>
              <li style={styles.listItem}>
                <FaCheckCircle style={styles.icon} />
                Trading mechanism and market dynamics
              </li>
            </ul>
          </div>
        </div>
      </div>
    </FullWidthSection>
  );
};

export default VideoSection;
