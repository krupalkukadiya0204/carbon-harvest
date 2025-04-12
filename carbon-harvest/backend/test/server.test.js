import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js'; // Assuming your main server file is named server.js
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('Server and Database Connection Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should connect to the server', async () => {
    const response = await request(app).get('/test'); // Assuming you have a /test route for this purpose
    expect(response.statusCode).toBe(404);
  });

  it('should connect to the database', async () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});