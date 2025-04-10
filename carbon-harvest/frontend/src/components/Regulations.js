/**
 * @file Regulations Component - Displays agricultural and environmental regulations
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaLeaf, FaSun, FaChartLine, FaFileAlt, FaFilter, FaSearch, FaPlay } from 'react-icons/fa';
import { IoCloud } from 'react-icons/io5';
import './Regulations.css';

/**
 * Regulations Component - Lists and filters agricultural and environmental regulations
 * @returns {JSX.Element} Regulations list component
 */
const Regulations = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const regulations = [
    {
      id: 'ccts',
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
      id:'bdr',
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
      id: 'emr',
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
      id: 'ncap',
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
      id: 'gcp',
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
      id: 'act',
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
      id: 'pks',
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
      id:'eca',
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
      id: 'mi',
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
      id: 'isfr',
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

  // List of categories
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
    <section className="regulations-page">
      {/* Main Header */}
      <header className="page-header">
        <div className="container">
          <div className="page-header-content">
            <h1>
              <span className="highlight">Empowering Change</span> Through Regulations
            </h1>
            <p>
              Explore the policies and initiatives shaping sustainable agriculture and environmental stewardship in India. Understand how these regulations drive positive change, support farmers, and protect our environment.
            </p>
          </div>
        </div>
      </header>

      {/* Regulations Overview Section */}
      <section className="overview-section">
        <div className="container">
          <div className="overview-content">
            <h2>Navigating the Regulatory Landscape</h2>
            <p>
              India's commitment to sustainable development is reflected in its comprehensive regulations for agriculture and environmental protection. From carbon credit trading schemes to biodiversity conservation, these policies are designed to promote responsible practices and ensure a sustainable future.
            </p>
            <p>
              Our platform provides a clear overview of key regulations, helping farmers, industries, and regulators stay informed and comply with the latest standards. Explore the details below to understand the scope and benefits of each regulation.
            </p>
          </div>
        </div>
      </section>

      {/* Regulations Content Section */}
      <section className="regulations-content-section">
        <div className="container">

        {/* Filters */}
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

             {/* Category Filters */}
            <div className={`category-filters ${isFilterOpen ? 'open' : ''}`}>
            <FaFilter className="filter-icon" onClick={() => setIsFilterOpen(!isFilterOpen)} />
              {isFilterOpen && (
                <div className="category-buttons">
                  {categories.map(category => (
                    <button key={category} className={`category-btn ${activeCategory === category ? 'active' : ''}`} onClick={() => setActiveCategory(category)}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <motion.div
            className="regulations-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredRegulations.map((regulation, index) => (
               <motion.div key={index} className="regulation-card" variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
                 <div className="regulation-card-header">
                  <div className="regulation-icon">{regulation.icon}</div>
                  <div className="regulation-title-container">
                    <h3 className="regulation-title">{regulation.title}</h3>
                  </div>
                 </div>
                 <div className="regulation-card-content">
                  <p className="regulation-description">{regulation.description}</p>
                  <div className="regulation-meta">
                    <span className="category"><span className="bold">Category:</span> {regulation.category}</span>
                    <span className="year"><span className="bold">Year:</span> {regulation.year}</span>
                  </div>
                  <div className="regulation-details">
                    <h4 className="details-title">Key Points:</h4>
                    <ul className="details-list">
                    {regulation.details.map((detail, idx) => (
                       <li key={idx} className="detail-item">{detail}</li>
                     ))}
                    </ul>
                   </div>
                   
                  
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
      </div>
      </div>
      </section>
    </div>
    </section>
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
