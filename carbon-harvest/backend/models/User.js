/**
 * @file User Model - Defines the Mongoose schema for user data
 */

const mongoose = require('mongoose');
const validator = require('validator');

/**
 * User Schema - Defines the structure of a user document in MongoDB
 * @type {mongoose.Schema}
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true,
        maxlength: [50, 'Name must be less than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password must be at least 8 characters']
    },
    userType: {
        type: String,
        required: [true, 'Please provide a user type'],
        enum: ['farmer', 'industry', 'regulator']
    },
    organization: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        default:""
    },
        address: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pincode: { type: String },
    },
        settings: {
        emailNotifications: { type: Boolean, default: true },
        smsNotifications: { type: Boolean, default: false },
        language: { type: String, default: "en" },
        theme: { type: String, default: "light" },
        twoFactorAuth: { type: Boolean, default: false },
    },
    refreshToken: { type: String }
}, { timestamps: true }); // Add timestamps here

module.exports = mongoose.model('User', userSchema);