import redis from 'redis';
import { promisify } from 'util';
import path from 'path';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'dotenv/config';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import creditRoutes from './routes/creditRoutes.js';
import userRoutes from './routes/userRoutes.js';
import gamificationRoutes from './routes/gamificationRoutes.js';
import onboardingRoutes from './routes/onboardingRoutes.js';
import siteRoutes from './routes/siteRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import reportsRoutes from './routes/reportsRoutes.js';
import blockchainRoutes from './routes/blockchainRoutes.js';
import express from 'express';
import xss from 'xss-clean';
import { fileURLToPath } from 'url';

const client = redis.createClient(); 

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
}); 
client.connect().catch(console.error);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const app = express();
app.set('trust proxy', 1);
// Logging Middleware
app.use(morgan('combined'));

// Security Middleware
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
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/site', siteRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/blockchain', blockchainRoutes);

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
app.use(express.static(path.join(__dirname, './frontend/build'), {
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
    res.sendFile(path.join(__dirname, './frontend/build/index.html'));
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