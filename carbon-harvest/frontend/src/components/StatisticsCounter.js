/**
 * @file StatisticsCounter.js
 * @description Animated statistics counter component with intersection observer
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StatisticsCounter = ({ value, duration = 2, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(value.replace(/,/g, ''));
      const incrementTime = (duration * 1000) / end;
      
      const timer = setInterval(() => {
        start += 1;
        const progress = Math.min(start * incrementTime / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        
        if (start === end) {
          clearInterval(timer);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="statistic-counter"
    >
      <span className="counter-value">
        {prefix}
        {inView ? count.toLocaleString() : '0'}
        {suffix}
      </span>
    </motion.div>
  );
};

StatisticsCounter.propTypes = {
  value: PropTypes.string.isRequired,
  duration: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string
};

export default React.memo(StatisticsCounter);
