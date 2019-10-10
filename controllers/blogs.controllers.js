const blogsRouter = require('express').Router();
const Blog = require('../models/blog.models');
const User = require('../models/user.models');

blogsRouter.get('/', async (request, response) => {
  // await Blog.find({}).then(blogs => {
  //   response.json(blogs.map(blog => blog.toJSON()));
  // });

  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1
  });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.get('/:id', async (request, response, next) => {
  // const id = request.params.id;

  // Blog.findById(id)
  //   .then(returnedBlog => {
  //     response.json(returnedBlog.toJSON());
  //   })
  //   .catch(error => next(error));

  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;

    const user = await User.findOne({});

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    });

    const savedBlog = await blog.save();

    response.status(201).json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes + 1
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    });
    if (updatedBlog) {
      response.json(updatedBlog.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
