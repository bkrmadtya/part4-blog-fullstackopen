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
  console.log('done');
});

test.skip('correct amount of blogs are returned as json', async () => {
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(blogs.body.length).toBe(helper.initialBlogs.length);
});

test.skip('the unique identifier property is named id', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(resultBlog.body.id).toBeDefined();
});

test.skip('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Muna Madan',
    author: 'Laxmi Prasad Devkota',
    url: 'www.munamadan.com',
    likes: 100
  };

  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);
});

test.skip('like is zero by default if its missing from request', async () => {
  const newBlog = {
    title: 'No likes',
    author: 'Not an author',
    url: 'www.nolikes.com'
  };

  const savedBlog = await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(savedBlog.body.likes).toBe(0);
});

test('missing title and url results in 400 Bad Request', async () => {
  const newBlog = {
    author: 'Ram Lal'
  };

  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
