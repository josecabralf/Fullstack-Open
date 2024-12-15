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

const newBlog = {
  title: "React Hooks",
  author: "Jane Popper",
  url: "http://www.jccodesblog.com",
  likes: 9
};

beforeEach(async () => {
  await Blog.deleteMany({});

  await new Blog(initialBlogs[0]).save();
  await new Blog(initialBlogs[1]).save();
});

describe('blogs', () => {
  test('returns correct amount of posts', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.length, initialBlogs.length);
  });

  test('has id property', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
      
    assert(response.body[0].id);
  });

  test('creates a new blog post', async () => {
    const response = await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsResponse = (await api.get('/api/blogs')).body; // Check if the new blog post was added
    assert.strictEqual(blogsResponse.length, initialBlogs.length + 1);

    const { id, ...addedBlog } = blogsResponse[2]; // Check if the new blog post has the correct values
    assert.deepStrictEqual(addedBlog, newBlog);
  });
});

after(async () => {
  await mongoose.connection.close();
});