/**
 * @file VideoBackground.js
 * @description A reusable video background component with fallback image support
 */

import React from 'react';
import PropTypes from 'prop-types';

const VideoBackground = ({ videoSrc = '/videos/nature-farming.mp4', fallbackImage = '/images/nature-farming.jpg' }) => {
  return (
    <>
      <video
        className="video-background"
        autoPlay
        muted
        loop
        playsInline
        poster={fallbackImage}
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <img 
          src={fallbackImage} 
          alt=""
          className="video-background"
          aria-hidden="true"
        />
      </video>
      <div 
        className="video-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
          zIndex: 1
        }}
        aria-hidden="true"
      />
    </>
  );
};

VideoBackground.propTypes = {
  videoSrc: PropTypes.string,
  fallbackImage: PropTypes.string
};

export default React.memo(VideoBackground);
