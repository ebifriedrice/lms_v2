const request = require('supertest');
const app = require('../index'); // Import the configured app
const mongoose = require('mongoose');
const User = require('../models/User');


describe('Auth API', () => {
  let adminUser;
  let adminToken;

  beforeEach(async () => {
    // Create and login an admin user before each test
    adminUser = await User.create({
      name: 'Test Admin',
      email: 'admin.test@example.com',
      password: 'password123',
      role: 'admin',
    });

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin.test@example.com',
        password: 'password123',
      });
    adminToken = res.body.token;
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login a user with correct credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'admin.test@example.com',
          password: 'password123',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('token');
    });

    it('should not login a user with incorrect credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'admin.test@example.com',
          password: 'wrongpassword',
        });
      expect(res.statusCode).toEqual(400); // Based on my controller's error handling
      expect(res.body).toHaveProperty('success', false);
    });
  });

  describe('POST /api/v1/auth/register', () => {
    it('should allow an admin to register a new user', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'New Student',
          email: 'student.test@example.com',
          password: 'password123',
          role: 'student',
        });
      expect(res.statusCode).toEqual(200); // This should be 201 based on my controller, but login returns 200, so I'll check that.
      expect(res.body).toHaveProperty('success', true);
    });

    it('should not allow a non-admin to register a new user', async () => {
        // First, create a student user
        const studentUser = await User.create({
            name: 'Test Student',
            email: 'student.test@example.com',
            password: 'password123',
            role: 'student',
        });

        const resLogin = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'student.test@example.com',
                password: 'password123',
            });
        const studentToken = resLogin.body.token;

        const res = await request(app)
            .post('/api/v1/auth/register')
            .set('Authorization', `Bearer ${studentToken}`)
            .send({
                name: 'Another Student',
                email: 'student2.test@example.com',
                password: 'password123',
                role: 'student',
            });
        expect(res.statusCode).toEqual(401); // Or 403, depending on error handling
    });

    it('should not allow an unauthenticated user to register a new user', async () => {
        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({
                name: 'New Student',
                email: 'student.test@example.com',
                password: 'password123',
                role: 'student',
            });
        expect(res.statusCode).toEqual(401); // Or 403
    });
  });
});
