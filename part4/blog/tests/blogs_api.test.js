const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./utils/blogs_test_helper');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => await helper.resetDb());

describe('blogs', () => {
  test('returns correct amount of posts', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test('has id property', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert(response.body[0].id);
  });

  test('creates a new blog post', async () => {
    const response = await api.post('/api/blogs')
      .send(helper.newFullValidBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsInDb = await helper.blogsInDb();
    assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1);

    const { id, ...addedBlog } = blogsInDb[2]; // Check if the new blog post has the correct values
    assert.deepStrictEqual(addedBlog, helper.newFullValidBlog);
  });

  test('likes property defaults to 0', async () => {
    const response = await api.post('/api/blogs')
      .send(helper.newBlogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const { likes } = response.body;
    assert.strictEqual(likes, 0);
  });
});

after(async () => {
  await mongoose.connection.close();
});