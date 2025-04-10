const express = require('express');
const { register, login, validateRegister, validateLogin, refreshToken, validateRefreshToken } = require('../controllers/authController');

const router = express.Router();

// Register a new user
const routes = [
  router.post('/register', validateRegister, register),

  // Login an existing user
  router.post('/login', validateLogin, login),
  router.post('/refresh', validateRefreshToken, refreshToken)
];

