const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.models');

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    author: 1,
    title: 1,
    url: 1,
    likes: 1
  });
  response.json(users.map(user => user.toJSON()));
});

userRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();
    response.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

module.exports = userRouter;
