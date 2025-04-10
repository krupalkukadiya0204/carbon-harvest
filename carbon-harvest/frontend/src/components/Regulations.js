/**
 * @file Regulations Component - Displays agricultural and environmental regulations
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaLeaf, FaSun, FaChartLine, FaFileAlt, FaFilter, FaSearch, FaPlay } from 'react-icons/fa';
import { IoCloud } from 'react-icons/io5';
import VideoSection from './VideoSection';
import './Regulations.css';

/**
 * Regulations Component - Lists and filters agricultural and environmental regulations
 * @returns {JSX.Element} Regulations list component
 */
const Regulations = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const regulations = [
    {
      title: 'Carbon Credit Trading Scheme (CCTS)',
      description: 'Latest framework for carbon credit trading in agriculture and industry',
      category: 'Environment',
      year: '2023',
      icon: <FaChartLine />,
      details: [
        'Mandatory carbon market framework under Energy Conservation Act',
        'Offset mechanism for agricultural sector',
        'Benefits for small and marginal farmers',
        'Integration with international carbon markets'
      ]
    },
    {
      title: 'Biological Diversity Rules',
      description: 'Updated framework for biodiversity conservation and sustainable use',
      category: 'Environment',
      year: '2024',
      icon: <FaLeaf />,
      details: [
        'Notified on October 22, 2024',
        'Protection of indigenous biodiversity',
        'Sustainable use of biological resources',
        'Fair benefit sharing mechanisms'
      ]
    },
    {
      title: 'Eco-mark Rules',
      description: 'Environmental product certification and labeling system',
      category: 'Environment',
      year: '2024',
      icon: <IoCloud />,
      details: [
        'Notified on September 26, 2024',
        'Standards for eco-friendly products',
        'Environmental impact assessment criteria',
        'Product lifecycle certification'
      ]
    },
    {
      title: 'National Clean Air Programme (NCAP)',
      description: 'Comprehensive air quality management initiative',
      category: 'Environment',
      year: '2024',
      icon: <IoCloud />,
      details: [
        '40% PM reduction achieved in 23 cities',
        '₹11,200 Crore allocated for pollution control',
        'PRANA Portal for real-time monitoring',
        'City-specific action plans'
      ]
    },
    {
      title: 'Green Credit Programme',
      description: 'Market mechanism for environmental actions',
      category: 'Environment',
      year: '2023',
      icon: <FaChartLine />,
      details: [
        'Green Credit Rules 2023 implementation',
        'Monetization of environmental actions',
        'Trading platform for green credits',
        'Sector-specific credit generation'
      ]
    },
    {
      title: 'Agricultural Carbon Trading',
      description: 'Carbon trading mechanisms for agricultural sector',
      category: 'Agriculture',
      year: '2024',
      icon: <FaLeaf />,
      details: [
        'Special provisions for small farmers',
        'Integration with national carbon market',
        'Sustainable farming practices incentives',
        'Digital MRV systems for agriculture'
      ]
    },
    {
      title: 'PM-KUSUM Scheme',
      description: 'Solar energy integration in agriculture',
      category: 'Agriculture/Energy',
      year: '2024',
      icon: <FaSun />,
      details: [
        'Updated implementation guidelines',
        'Enhanced subsidy for solar pumps',
        'Grid integration mechanisms',
        'Farmer income enhancement focus'
      ]
    },
    {
      title: 'Energy Conservation Act',
      description: 'Amended framework for energy efficiency and carbon markets',
      category: 'Agriculture/Energy',
      year: '2022',
      icon: <FaSun />,
      details: [
        'Carbon market development provisions',
        'Energy efficiency mandates',
        'Renewable energy integration',
        'Cross-sector implementation guidelines'
      ]
    },
    {
      title: 'MISHTI Initiative',
      description: 'Mangrove Initiative for Shoreline Habitats & Tangible Incomes',
      category: 'Environment',
      year: '2024',
      icon: <FaLeaf />,
      details: [
        'Mangrove restoration in 13 states',
        '22,561 Hectares restored',
        'Coastal sustainability focus',
        'Carbon sequestration benefits'
      ]
    },
    {
      title: 'India State of Forest Report',
      description: 'National forest cover assessment and monitoring',
      category: 'Environment',
      year: '2023',
      icon: <FaFileAlt />,
      details: [
        'Forest cover reaches 25.17% of land area',
        'Tree cover assessment methodology',
        'State-wise forest statistics',
        'Carbon stock evaluation'
      ]
    }
  ];

  const categories = ['all', 'Agriculture', 'Environment', 'Agriculture/Energy'];

  const filteredRegulations = regulations.filter(reg => {
    const matchesCategory = activeCategory === 'all' || reg.category === activeCategory;
    const matchesSearch = reg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="regulations-container">
      {/* Header Section */}
      <div className="regulations-header">
        <h1>Indian Agricultural & Environmental Regulations</h1>
        <p>Comprehensive guide to policies and schemes promoting sustainable agriculture and environmental protection</p>
      </div>
      
      {/* Video Section */}
      <div className="video-section-wrapper">
        <div className="video-section-header">
          <FaPlay className="play-icon" />
          <h2>Understanding Carbon Credit Regulations</h2>
        </div>
        <VideoSection />
      </div>

      {/* Regulations Content */}
      <div className="regulations-content">
          <div className="regulations-filters">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search regulations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="category-filters">
              <FaFilter className="filter-icon" />
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            className="regulations-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredRegulations.map((regulation, index) => (
              <motion.div
                key={index}
                className="regulation-card"
                variants={itemVariants}
              >
                <div className="regulation-icon">{regulation.icon}</div>
                <div className="regulation-content">
                  <h3>{regulation.title}</h3>
                  <p className="regulation-description">{regulation.description}</p>
                  <div className="regulation-meta">
                    <span className="category">{regulation.category}</span>
                    <span className="year">Year: {regulation.year}</span>
                  </div>
                  <div className="regulation-details">
                    <h4>Key Points:</h4>
                    <ul>
                      {regulation.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
      </div>
    </div>
  );
};

Regulations.propTypes = {
  onCategoryChange: PropTypes.func,
  onSearch: PropTypes.func,
  initialCategory: PropTypes.string,
  customRegulations: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      details: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  showSearch: PropTypes.bool,
  showFilters: PropTypes.bool
};

Regulations.defaultProps = {
  onCategoryChange: () => {},
  onSearch: () => {},
  initialCategory: 'all',
  customRegulations: [],
  showSearch: true,
  showFilters: true
};

export default Regulations;
