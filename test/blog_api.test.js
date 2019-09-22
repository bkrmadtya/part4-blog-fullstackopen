const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog.models');
const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log('cleared');
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());

  await Promise.all(promiseArray);
  console.log('new database saved');
});

test.only('correct amount of blogs are returned as json', async () => {
  console.log('test started');
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(blogs.body.length).toBe(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
