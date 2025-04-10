import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLeaf, FaChartLine, FaHandshake } from 'react-icons/fa';
import './MarketplacePreview.css';

const MarketplacePreview = () => {
  return (
    <section className="marketplace-preview">
      <div className="marketplace-preview-content">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Carbon Credit Marketplace</h2>
          <p className="section-subtitle">
            Connect with verified projects and trade carbon credits with confidence
          </p>
        </motion.div>

        <div className="marketplace-cards">
          {[
            {
              icon: <FaLeaf />,
              title: "Forest Conservation",
              location: "Amazon Rainforest",
              credits: "50,000",
              price: "$25",
              image: "/images/forest-project.jpg"
            },
            {
              icon: <FaChartLine />,
              title: "Sustainable Agriculture",
              location: "Midwest USA",
              credits: "30,000",
              price: "$22",
              image: "/images/agriculture-project.jpg"
            },
            {
              icon: <FaHandshake />,
              title: "Community Solar",
              location: "Rural India",
              credits: "25,000",
              price: "$20",
              image: "/images/solar-project.jpg"
            }
          ].map((project, index) => (
            <motion.div
              key={index}
              className="marketplace-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="card-image" style={{ backgroundImage: `url(${project.image})` }}>
                <div className="card-overlay"></div>
                <span className="project-type">
                  {project.icon}
                  {project.title}
                </span>
              </div>
              <div className="card-content">
                <h3>{project.title}</h3>
                <p className="location">{project.location}</p>
                <div className="project-stats">
                  <div className="stat">
                    <span className="label">Available Credits</span>
                    <span className="value">{project.credits}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Price per Credit</span>
                    <span className="value">{project.price}</span>
                  </div>
                </div>
                <Link to={`/marketplace/${index + 1}`} className="btn btn-secondary">
                  View Project
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="marketplace-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/marketplace" className="btn btn-primary">
            Explore All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketplacePreview;
