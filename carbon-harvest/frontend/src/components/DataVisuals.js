/**
 * @file Data Visualization Component for Carbon Harvest
 * Provides various chart types for displaying carbon credit and sustainability metrics
 * @module DataVisuals
 */

import React from 'react';
import PropTypes from 'prop-types';
import { 
  LineChart, Line, BarChart, Bar,
  RadarChart, Radar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  RadialBarChart, RadialBar, ComposedChart, Area,
  Treemap, Cell, PieChart, Pie, AreaChart
} from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';
import './DataVisuals.css';

/**
 * Data Visualization Component - Renders various types of charts for data visualization
 * @component
 * @param {object} props - Component props
 * @param {('line'|'bar'|'radar'|'scatter'|'radialBar'|'composed'|'treemap'|'pie'|'area')} props.type - Type of chart to render
 * @param {Array<object>} props.data - Data to be visualized
 * @param {string} props.title - Chart title
 * @param {string} props.description - Chart description
 * @returns {JSX.Element} Rendered chart component
 */
const DataVisuals = ({ type, data, title, description }) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  /** @constant {Array<string>} Chart color palette */
  const COLORS = [
    '#4CAF50', '#2196F3', '#FFC107', '#E91E63',
    '#00BCD4', '#FF5722', '#607D8B', '#3F51B5'
  ];

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'radar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        );

      case 'radialBar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="10%"
              outerRadius="80%"
              barSize={10}
              data={data}
            >
              <RadialBar
                background
                dataKey="value"
                label={{ position: 'insideStart', fill: '#fff' }}
              />
              <Legend iconSize={10} />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        );

      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis dataKey="x" type="number" name="x" />
              <YAxis dataKey="y" type="number" name="y" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Values" data={data} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        );

      case 'composed':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={data}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="area" fill="#8884d8" stroke="#8884d8" />
              <Bar dataKey="bar" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="line" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        );

      case 'treemap':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <Treemap
              data={data}
              dataKey="value"
              aspectRatio={4/3}
              stroke="#fff"
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Treemap>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="data-visual-container">
      {title && <h3 className="chart-title">{title}</h3>}
      {description && <p className="chart-description">{description}</p>}
      <div className="chart-wrapper">
        {renderChart()}
      </div>
    </div>
  );
};

DataVisuals.propTypes = {
  type: PropTypes.oneOf(['line', 'bar', 'radar', 'scatter', 'radialBar', 'composed', 'treemap', 'pie', 'area']).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default DataVisuals;
