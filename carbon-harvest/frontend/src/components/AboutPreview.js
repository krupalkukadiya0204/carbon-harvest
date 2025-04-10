import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLeaf, FaUsers, FaGlobe } from 'react-icons/fa';
import './AboutPreview.css';

const AboutPreview = () => {
  const stats = [
    {
      icon: <FaLeaf />,
      number: "1M+",
      label: "Carbon Credits Issued"
    },
    {
      icon: <FaUsers />,
      number: "10K+",
      label: "Farmers Empowered"
    },
    {
      icon: <FaGlobe />,
      number: "50+",
      label: "Countries Reached"
    }
  ];

  return (
    <section className="about-preview">
      <div className="about-preview-content">
        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Revolutionizing Carbon Markets</h2>
            <p className="lead">
              We are building a sustainable future by connecting farmers with carbon markets
              through innovative technology and trusted partnerships.
            </p>
            <p>
              Carbon Harvest empowers agricultural communities to participate in carbon markets
              while promoting sustainable farming practices that benefit our planet.
            </p>
            <div className="about-actions">
              <Link to="/about" className="btn btn-primary">Learn Our Story</Link>
              <Link to="/contact" className="btn btn-outline">Contact Us</Link>
            </div>
          </motion.div>

          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src="/images/about-preview.jpg" alt="Sustainable Farming" />
          </motion.div>
        </div>

        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="values-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="value-item">
            <h3>Our Mission</h3>
            <p>To accelerate the transition to sustainable agriculture through innovative carbon market solutions.</p>
          </div>
          <div className="value-item">
            <h3>Our Vision</h3>
            <p>A world where farmers are rewarded for their role in fighting climate change.</p>
          </div>
          <div className="value-item">
            <h3>Our Values</h3>
            <p>Transparency, Innovation, Sustainability, and Community Empowerment.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;
