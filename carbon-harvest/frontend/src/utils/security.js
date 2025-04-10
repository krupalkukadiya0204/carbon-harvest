import { AES, enc } from 'crypto-js';
import { jwtDecode } from 'jwt-decode';

// Security configuration
const SECURITY_CONFIG = {
  TOKEN_KEY: 'ch_auth_token',
  REFRESH_TOKEN_KEY: 'ch_refresh_token',
  TOKEN_EXPIRY_BUFFER: 300, // 5 minutes in seconds
  PASSWORD_MIN_LENGTH: 12,
  PASSWORD_REQUIREMENTS: {
    minLength: 12,
    requireNumbers: true,
    requireSpecialChars: true,
    requireUppercase: true,
    requireLowercase: true
  }
};

// Token management
export const tokenManager = {
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem(SECURITY_CONFIG.TOKEN_KEY, accessToken);
    if (refreshToken) {
      localStorage.setItem(SECURITY_CONFIG.REFRESH_TOKEN_KEY, refreshToken);
    }
  },

  getAccessToken: () => localStorage.getItem(SECURITY_CONFIG.TOKEN_KEY),
  
  getRefreshToken: () => localStorage.getItem(SECURITY_CONFIG.REFRESH_TOKEN_KEY),
  
  clearTokens: () => {
    localStorage.removeItem(SECURITY_CONFIG.TOKEN_KEY);
    localStorage.removeItem(SECURITY_CONFIG.REFRESH_TOKEN_KEY);
  },

  isTokenExpired: (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp < (Date.now() / 1000 + SECURITY_CONFIG.TOKEN_EXPIRY_BUFFER);
    } catch {
      return true;
    }
  }
};

// Data encryption utilities
export const encryptionUtils = {
  encryptData: (data, key) => {
    try {
      return AES.encrypt(JSON.stringify(data), key).toString();
    } catch (error) {
      console.error('Encryption failed:', error);
      return null;
    }
  },

  decryptData: (encryptedData, key) => {
    try {
      const bytes = AES.decrypt(encryptedData, key);
      return JSON.parse(bytes.toString(enc.Utf8));
    } catch (error) {
      console.error('Decryption failed:', error);
      return null;
    }
  }
};

// Password validation
export const passwordValidator = {
  validatePassword: (password) => {
    const requirements = SECURITY_CONFIG.PASSWORD_REQUIREMENTS;
    
    const validations = {
      length: password.length >= requirements.minLength,
      numbers: requirements.requireNumbers ? /\d/.test(password) : true,
      special: requirements.requireSpecialChars ? /[!@#$%^&*(),.?":{}|<>]/.test(password) : true,
      uppercase: requirements.requireUppercase ? /[A-Z]/.test(password) : true,
      lowercase: requirements.requireLowercase ? /[a-z]/.test(password) : true
    };

    return {
      isValid: Object.values(validations).every(v => v),
      validations
    };
  }
};

// Security headers
export const securityHeaders = {
  getHeaders: () => ({
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
  })
};

// CSRF Protection
export const csrfProtection = {
  token: null,

  generateToken: () => {
    const token = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    csrfProtection.token = token;
    return token;
  },

  validateToken: (token) => {
    return token === csrfProtection.token;
  }
};

// Rate limiting
export const rateLimiter = {
  attempts: new Map(),
  
  checkLimit: (key, maxAttempts = 5, timeWindow = 300000) => { // 5 minutes window
    const now = Date.now();
    const userAttempts = rateLimiter.attempts.get(key) || [];
    
    // Clean old attempts
    const validAttempts = userAttempts.filter(timestamp => 
      now - timestamp < timeWindow
    );
    
    if (validAttempts.length >= maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    rateLimiter.attempts.set(key, validAttempts);
    return true;
  }
};

// Input sanitization
export const sanitizer = {
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/[<>]/g, '') // Remove < and >
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove onclick= and similar
      .trim();
  },
  
  sanitizeObject: (obj) => {
    if (typeof obj !== 'object') return obj;
    
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = typeof obj[key] === 'string' 
        ? sanitizer.sanitizeInput(obj[key])
        : obj[key];
      return acc;
    }, {});
  }
};
