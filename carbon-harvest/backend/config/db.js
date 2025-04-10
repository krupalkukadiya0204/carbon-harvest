/**
 * @file Database configuration and connection setup
 */

const mongoose = require('mongoose');

/**
 * Logger function for database operations
 * @param {string} message - Message to log
 * @param {string} [level='info'] - Log level (info, error)
 * @private
 */
const dbLogger = (message, level = 'info') => {
  // In production, this should use a proper logging system
  if (process.env.NODE_ENV === 'production') {
    // Use production logging system
    return;
  }
  if (level === 'error') {
    console.error(`[Database Error] ${message}`);
  } else {
    console.log(`[Database] ${message}`);
  }
};

/**
 * Connects to MongoDB database and sets up connection event handlers
 * @async
 * @returns {Promise<void>}
 * @throws {Error} If connection fails
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/carbonharvest', {
            serverSelectionTimeoutMS: 5000
        });

        dbLogger(`MongoDB connected: ${conn.connection.host}`);

        // Handle connection errors after initial connection
        mongoose.connection.on('error', err => {
            dbLogger(`MongoDB connection error: ${err}`, 'error');
        });

        mongoose.connection.on('disconnected', () => {
            dbLogger('MongoDB disconnected');
        });

        // Handle process termination
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            dbLogger('MongoDB connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        dbLogger(`MongoDB connection error: ${error.message}`, 'error');
        process.exit(1);
    }
};

module.exports = connectDB;