const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: "Hello World",
    author: "James A. Doe",
    url: "http://www.jccodesblog.com",
    likes: 3
  },
  {
    title: "JS Basics",
    author: "Fred K. Simmons",
    url: "http://www.jccodesblog.com",
    likes: 5
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  await new Blog(initialBlogs[0]).save();
  await new Blog(initialBlogs[1]).save();
});

describe('blogs', () => {
  test('returns correct amount of posts', async () => {
    const response = await api.get('/api/blogs');
    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.length, initialBlogs.length);
  });

  test('has id property', async () => {
    const response = await api.get('/api/blogs');
    assert.strictEqual(response.statusCode, 200);
    assert(response.body[0].id);
  });
});

after(async () => {
  await mongoose.connection.close();
});