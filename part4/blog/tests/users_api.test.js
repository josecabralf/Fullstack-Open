const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./utils/users_test_helper');
const app = require('../app');

const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => helper.resetDb());

  describe('viewing all users', () => {
    test('returns correct amount of users', async () => {
      const response = await api.get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.strictEqual(response.body.length, helper.initialUsers.length);
    });

    test('has id property', async () => {
      const response = await api.get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert(response.body[0].id);
    });
  });

  describe('creating a new user', () => {
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb();
      await api
        .post('/api/users')
        .send(helper.newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

      const usernames = usersAtEnd.map(u => u.username);
      assert(usernames.includes(helper.newUser.username));
    });
  });
});

after(async () => await mongoose.connection.close());