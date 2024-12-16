const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    
    response.json(blogs);
});
  
blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body;

    const blog = new Blog({ title, author, url, likes: likes ?? 0 });
    const result = await blog.save();

    response.status(201).json(result);
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
