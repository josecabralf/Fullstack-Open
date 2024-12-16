const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});
  
blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes, userId } = request.body;
  const user = await User.findById(userId);

  const blog = new Blog({ 
    title, 
    author, 
    url, 
    likes: likes ?? 0,
    user: user.id
  });
  
  const savedBlog = await blog.save();
  user.blogs = (user.blogs || []).concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { title, author, url, likes } = request.body;
  const updatedBlog = { title, author, url, likes };
  
  const result = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
  response.json(result);
});

module.exports = blogsRouter;
