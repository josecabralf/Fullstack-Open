const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    
    response.json(blogs);
});
  
blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body;
    if (!title)
        return response.status(400).json({ error: 'Title is required' });
    if (!url)
        return response.status(400).json({ error: 'Url is required' });

    const blog = new Blog({ title, author, url, likes: likes ?? 0 });
    const result = await blog.save();

    response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;
    await Blog.findByIdAndDelete(id);

    response.status(204).end();
});

module.exports = blogsRouter;
