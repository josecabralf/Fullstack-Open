const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');
const { blogs } = require('./utils/blogList');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
})

describe('total likes', () => {
  test('of empty list is zero', () => assert.strictEqual(listHelper.totalLikes([]), 0));

  test('of one value is the value itself', () => assert.strictEqual(listHelper.totalLikes([blogs[0]]), blogs[0].likes));

  test('of a bigger list is calculated right', () => assert.strictEqual(listHelper.totalLikes(blogs), 36));
})

describe('favourite blog', () => {
  test('of empty list is null', () => assert.strictEqual(listHelper.favouriteBlog([]), null));

  test('of one value is the value itself', () => assert.deepStrictEqual(listHelper.favouriteBlog([blogs[0]]), blogs[0]));

  test('of a bigger list is calculated right', () => assert.deepStrictEqual(listHelper.favouriteBlog(blogs), blogs[2]));
});

describe('most blogs', () => {
  test('of empty list is null', () => assert.strictEqual(listHelper.mostBlogs([]), null));

  test('of one value is the value itself', () => assert.deepStrictEqual(listHelper.mostBlogs([blogs[0]]), { author: blogs[0].author, blogs: 1 }));

  test('of a bigger list is calculated right', () => assert.deepStrictEqual(listHelper.mostBlogs(blogs), { author: 'Robert C. Martin', blogs: 3 }));
});