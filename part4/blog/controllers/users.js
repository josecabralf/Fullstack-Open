const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
    const users = await User.find({});
    response.json(users);
});

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body;
    if (!password || password.length < 3)   
        return response.status(400).json({ error: 'password must be at least 3 characters long' });

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    try {
        const savedUser = await new User({ username, name, passwordHash }).save();
        response.status(201).json(savedUser);
    }
    catch (error) {
        if (error.name === 'ValidationError')
            return response.status(400).json({ error: error.message });
        else if (error.code === 11000)
            return response.status(400).json({ error: 'username must be unique' });
        next(error);
    }
})

module.exports = usersRouter