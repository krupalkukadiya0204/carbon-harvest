import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaUsers, FaLeaf } from 'react-icons/fa';
import './ProjectsShowcase.css';

const ProjectsShowcase = () => {
  const projects = [
    {
      title: "Midwest Regenerative Agriculture",
      location: "Iowa, USA",
      impact: {
        acres: "50,000",
        farmers: "500+",
        credits: "100,000"
      },
      image: "/images/midwest-project.jpg",
      description: "Transforming conventional farming practices to regenerative agriculture across the Midwest, sequestering carbon and improving soil health."
    },
    {
      title: "Amazon Forest Conservation",
      location: "Para, Brazil",
      impact: {
        acres: "100,000",
        farmers: "1,000+",
        credits: "250,000"
      },
      image: "/images/amazon-project.jpg",
      description: "Protecting vital rainforest ecosystems while supporting indigenous communities through sustainable agroforestry practices."
    },
    {
      title: "Indian Sustainable Rice",
      location: "Punjab, India",
      impact: {
        acres: "30,000",
        farmers: "2,500+",
        credits: "75,000"
      },
      image: "/images/india-project.jpg",
      description: "Implementing water-saving rice cultivation techniques that reduce methane emissions and improve farmer livelihoods."
    }
  ];

  return (
    <section className="projects-showcase">
      <div className="projects-content">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Featured Projects</h2>
          <p className="section-subtitle">
            Discover how we are making a real impact across the globe
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-location">
                  <FaMapMarkerAlt />
                  {project.location}
                </div>
              </div>
              <div className="project-details">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-impact">
                  <div className="impact-item">
                    <FaLeaf />
                    <div className="impact-text">
                      <span className="impact-value">{project.impact.acres}</span>
                      <span className="impact-label">Acres</span>
                    </div>
                  </div>
                  <div className="impact-item">
                    <FaUsers />
                    <div className="impact-text">
                      <span className="impact-value">{project.impact.farmers}</span>
                      <span className="impact-label">Farmers</span>
                    </div>
                  </div>
                  <div className="impact-item">
                    <FaLeaf />
                    <div className="impact-text">
                      <span className="impact-value">{project.impact.credits}</span>
                      <span className="impact-label">Credits</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="view-all-projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button className="btn btn-primary">View All Projects</button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
