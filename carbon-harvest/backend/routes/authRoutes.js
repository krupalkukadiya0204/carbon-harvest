import express from 'express';
import { register, login, validateRegister, validateLogin, refreshToken, validateRefreshToken, verifyEmail, validateVerifyEmail, forgotPassword, resetPassword, validateForgotPassword, validateResetPassword } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();


// Rate limiter for login requests
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // 5 requests
  message: 'Too many login attempts, please try again after 10 minutes'
});


// Rate limiter for register requests
const registerLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // 5 requests
  message: 'Too many register attempts, please try again after 10 minutes'
});

// Register a new user
router.post('/register', registerLimiter, validateRegister, register);

// Login an existing user
router.post('/login', loginLimiter, validateLogin, login);

// Refresh Token
router.post('/refresh', validateRefreshToken, refreshToken);

// Verify Email
router.get('/verify-email/:token', validateVerifyEmail, verifyEmail);

// Forgot password
router.post('/forgot-password', validateForgotPassword, forgotPassword);

// Reset password
router.patch('/reset-password/:token', validateResetPassword, resetPassword);



export default router;

