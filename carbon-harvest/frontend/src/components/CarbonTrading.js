/**
 * @file Carbon Trading Component - Handles carbon credit trading functionality
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaChartLine, FaHandshake, FaGlobe } from 'react-icons/fa';
import './CarbonTrading.css';
/**
 * CarbonTrading Component - Provides interface for trading carbon credits
 * @returns {JSX.Element} Carbon trading interface component
 */
const CarbonTrading = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const marketData = [
    {
      region: 'European Union',
      price: '€80-90',
      volume: '1.6B',
      trend: '+15%'
    },
    {
      region: 'North America',
      price: '$65-75',
      volume: '850M',
      trend: '+12%'
    },
    {
      region: 'Asia Pacific',
      price: '$45-55',
      volume: '720M',
      trend: '+20%'
    }
  ];

  return (
    <div className="carbon-trading-page">
      <motion.section className="trading-hero" {...fadeInUp}>
        <h1>Carbon Trading Insights</h1>
        <p>Understanding the global carbon market and its impact on climate change mitigation</p>
      </motion.section>

      <motion.section className="trading-overview" {...fadeInUp}>
        <div className="overview-card">
          <FaLeaf className="card-icon" />
          <h2>What is Carbon Trading?</h2>
          <p>Carbon trading is a market-based system designed to reduce greenhouse gas emissions. Companies receive or buy emission allowances, which can be traded to meet reduction targets cost-effectively.</p>
        </div>
      </motion.section>

      <motion.section className="market-stats" {...fadeInUp}>
        <h2>Global Carbon Market Statistics</h2>
        <div className="stats-grid">
          {marketData.map((market, index) => (
            <div key={index} className="stat-card">
              <h3>{market.region}</h3>
              <div className="stat-details">
                <p>Current Price: {market.price}/tCO2e</p>
                <p>Trading Volume: {market.volume}</p>
                <p className="trend">Year Growth: {market.trend}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="trading-process" {...fadeInUp}>
        <h2>How Carbon Trading Works</h2>
        <div className="process-steps">
          <div className="step">
            <FaChartLine className="step-icon" />
            <h3>Cap Setting</h3>
            <p>Governments set emission limits for industries</p>
          </div>
          <div className="step">
            <FaHandshake className="step-icon" />
            <h3>Allowance Trading</h3>
            <p>Companies buy/sell credits based on needs</p>
          </div>
          <div className="step">
            <FaGlobe className="step-icon" />
            <h3>Global Impact</h3>
            <p>Reduced emissions and environmental benefits</p>
          </div>
        </div>
      </motion.section>

      <motion.section className="benefits-section" {...fadeInUp}>
        <h2>Benefits of Carbon Trading</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Economic Benefits</h3>
            <ul>
              <li>Cost-effective emission reduction</li>
              <li>New revenue streams</li>
              <li>Market-driven innovation</li>
            </ul>
          </div>
          <div className="benefit-card">
            <h3>Environmental Impact</h3>
            <ul>
              <li>Reduced greenhouse gas emissions</li>
              <li>Promotion of clean technologies</li>
              <li>Global climate action</li>
            </ul>
          </div>
          <div className="benefit-card">
            <h3>Social Benefits</h3>
            <ul>
              <li>Job creation in green sectors</li>
              <li>Improved public health</li>
              <li>Sustainable development</li>
            </ul>
          </div>
        </div>
      </motion.section>

      <motion.section className="live-data" {...fadeInUp}>
        <h2>Real-Time Carbon Market Insights</h2>
        <div className="market-ticker">
          {/* Add real-time market data visualization here */}
        </div>
      </motion.section>
    </div>
  );
};

export default CarbonTrading;
