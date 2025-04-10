const express = require('express');
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const creditRoutes = require('./routes/creditRoutes');
const userRoutes = require('./routes/userRoutes');
const gamificationRoutes = require('./routes/gamificationRoutes');
const onboardingRoutes = require('./routes/onboardingRoutes');
const siteRoutes = require('./routes/siteRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const reportsRoutes = require('./routes/reportsRoutes');

const app = express();

// Trust proxy setting for rate limiter
app.set('trust proxy', 1);

// Logging Middleware
app.use(morgan('combined'));

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

// CORS Configuration
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : 'http://localhost:3000',
    credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,
    max: process.env.RATE_LIMIT_MAX || 100
});
app.use('/api/', limiter);

// Body Parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/users', userRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/users', onboardingRoutes);
app.use('/api/site', siteRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/reports', reportsRoutes);

// Serve static files with proper MIME types
app.use(express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        } else if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

app.use('/api/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../frontend/build'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Serve index.html for all routes not starting with /api
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Connect to database
connectDB();

// Global Error Handler
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    res.status(statusCode).json({
        status,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

app.use(errorHandler);

// Handle Unhandled Routes
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});