const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./utils/blogs_test_helper');
const app = require('../app');

const api = supertest(app);

describe('when there are some blogs saved initially', () => {
  beforeEach(async () => await helper.resetDb());

  describe('viewing all blog posts', () => {
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
  });

  describe('creating a new blog post', () => {
    test('creates a new blog post', async () => {
      const response = await api.post('/api/blogs')
        .send(helper.newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsInDb = await helper.blogsInDb();
      assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1);

      const { id, ...addedBlog } = blogsInDb[2]; // Check if the new blog post has the correct values
      assert.deepStrictEqual(addedBlog, helper.newBlog);
    });

    test('likes property defaults to 0', async () => {
      const blogWithoutLikes = { ...helper.newBlog, likes: undefined };
      const response = await api.post('/api/blogs')
        .send(blogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const { likes } = response.body;
      assert.strictEqual(likes, 0);
    });

    test('returns 400 if title is missing', async () => {
      const blogWithoutTitle = { ...helper.newBlog, title: undefined };
      await api.post('/api/blogs')
        .send(blogWithoutTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        .expect({ error: 'Title is required' });      
    });

    test('returns 400 if url is missing', async () => {
      const blogWithoutUrl = { ...helper.newBlog, url: undefined };
      await api.post('/api/blogs')
        .send(blogWithoutUrl)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        .expect({ error: 'Url is required' });
    });
  });

  describe('deleting a blog post', () => {
    test('deletes a blog post', async () => {
      const blogsInDb = await helper.blogsInDb();
      const { id } = blogsInDb[0];

      await api.delete(`/api/blogs/${id}`)
        .expect(204);

      const blogsAfterDeletion = await helper.blogsInDb();
      assert.strictEqual(blogsAfterDeletion.length, helper.initialBlogs.length - 1);

      const ids = blogsAfterDeletion.map(b => b.id);
      assert(!ids.includes(id));
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});