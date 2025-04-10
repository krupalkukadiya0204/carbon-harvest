const request = require('supertest');
const app = require('../app'); // Assuming your Express app is in app.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

jest.mock('../models/User');
jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

describe('AuthController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        userType: 'farmer',
        organization: "test",
        phone: "+1234567890",
      };

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.mockImplementationOnce(() => ({
        _id: 'someUserId',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
        userType: 'farmer',
        organization: "test",
        phone: "+1234567890",
        save: jest.fn().mockResolvedValue({_id: 'someUserId',}),
      }));
      jwt.sign.mockReturnValue('testToken');

      const res = await request(app)
        .post('/api/auth/register')
        .send(newUser);

      expect(res.statusCode).toEqual(201);
      expect(res.body.token).toEqual('testToken');
      expect(res.body.user.name).toEqual(newUser.name);
    });

    it('should return 400 if user already exists', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        userType: 'farmer',
        organization: "test",
        phone: "+1234567890",
      };
      User.findOne.mockResolvedValue({});

      const res = await request(app)
        .post('/api/auth/register')
        .send(newUser);

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('User already exists');
    });

    it('should return 400 if invalid data is provided', async () => {
        const invalidUser = {
          name: '',
          email: 'invalid-email',
          password: 'short',
          userType: '',
          organization: "",
          phone: "invalid",
        };
  
        const res = await request(app)
          .post('/api/auth/register')
          .send(invalidUser);
  
        expect(res.statusCode).toEqual(400);
      });

    it('should return 500 if server error occurs', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        userType: 'farmer',
        organization: "test",
        phone: "+1234567890",
      };
      User.findOne.mockRejectedValue(new Error('Database error'));

      const res = await request(app)
        .post('/api/auth/register')
        .send(newUser);

      expect(res.statusCode).toEqual(500);
      expect(res.body.message).toEqual('Registration failed. Please check your details and try again.');
    });
  });

  describe('login', () => {
    it('should login a user successfully', async () => {
      const user = {
        _id: 'someUserId',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
        userType: 'farmer',
        organization: "test",
        phone: "+1234567890",
      };
      const credentials = { email: 'test@example.com', password: 'password123' };

      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('testToken');

      const res = await request(app)
        .post('/api/auth/login')
        .send(credentials);

      expect(res.statusCode).toEqual(200);
      expect(res.body.token).toEqual('testToken');
      expect(res.body.user.name).toEqual(user.name);
    });

    it('should return 400 if user is not found', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      User.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/auth/login')
        .send(credentials);

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('User not found');
    });

    it('should return 400 if invalid credentials', async () => {
      const user = {
        _id: 'someUserId',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
        userType: 'farmer',
        organization: "test",
        phone: "+1234567890",
      };
      const credentials = { email: 'test@example.com', password: 'wrongPassword' };
      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(false);

      const res = await request(app)
        .post('/api/auth/login')
        .send(credentials);

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Invalid credentials');
    });

    it('should return 500 if server error occurs', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      User.findOne.mockRejectedValue(new Error('Database error'));

      const res = await request(app)
        .post('/api/auth/login')
        .send(credentials);

      expect(res.statusCode).toEqual(500);
      expect(res.body.message).toEqual('Login failed. Please check your credentials and try again.');
    });

        it('should return 400 if invalid data is provided', async () => {
            const invalidCredentials = { email: '', password: '' };
      
            const res = await request(app)
              .post('/api/auth/login')
              .send(invalidCredentials);
      
            expect(res.statusCode).toEqual(400);
          });
  });

  describe('refreshToken', () => {
    it('should refresh token successfully', async () => {
        const user = {
          _id: 'someUserId',
          name: 'Test User',
          email: 'test@example.com',
          password: 'hashedPassword',
          userType: 'farmer',
          organization: "test",
          phone: "+1234567890",
          refreshToken: 'testRefreshToken'
        };
        const body = {refreshToken: 'testRefreshToken'};
        jwt.verify.mockResolvedValue({ id: 'someUserId' });
        User.findById.mockResolvedValue(user);
        jwt.sign.mockReturnValue('newAccessToken');
  
        const res = await request(app)
          .post('/api/auth/refresh')
          .send(body);
  
        expect(res.statusCode).toEqual(200);
        expect(res.body.token).toEqual('newAccessToken');
      });

    it('should return 401 if invalid token', async () => {
        const body = {refreshToken: 'invalidRefreshToken'};
        jwt.verify.mockRejectedValue(new Error('Invalid token'));
        const res = await request(app)
          .post('/api/auth/refresh')
          .send(body);
  
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Invalid refresh token.');
      });

    it('should return 401 if user not found', async () => {
        const body = {refreshToken: 'testRefreshToken'};
        jwt.verify.mockResolvedValue({ id: 'someUserId' });
        User.findById.mockResolvedValue(null);
        const res = await request(app)
          .post('/api/auth/refresh')
          .send(body);
  
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('User not found.');
      });

    it('should return 500 if server error occurs', async () => {
        const body = {refreshToken: 'testRefreshToken'};
        jwt.verify.mockRejectedValue(new Error('Database error'));

        const res = await request(app)
          .post('/api/auth/refresh')
          .send(body);
  
        expect(res.statusCode).toEqual(500);
        expect(res.body.message).not.toBeNull();
    });

        it('should return 400 if invalid data is provided', async () => {
            const body = { refreshToken: '' };
      
            const res = await request(app)
              .post('/api/auth/refresh')
              .send(body);
      
            expect(res.statusCode).toEqual(400);
          });
  });
});