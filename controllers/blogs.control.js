const blogsRouter = require('express').Router();
const Blog = require('../models/blog.models');

blogsRouter.get('/', async (request, response) => {
  // await Blog.find({}).then(blogs => {
  //   response.json(blogs.map(blog => blog.toJSON()));
  // });

  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.get('/:id', (request, response, next) => {
  const id = request.params.id;

  Blog.findById(id)
    .then(returnedBlog => {
      response.json(returnedBlog.toJSON());
    })
    .catch(error => next(error));
});

blogsRouter.post('/', (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  });

  blog
    .save()
    .then(savedBlog => {
      response.json(savedBlog.toJSON());
    })
    .catch(error => next(error));
});

module.exports = blogsRouter;
