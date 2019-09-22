const Blog = require('../models/blog.models');

const initialBlogs = [
  {
    title: 'New Moon',
    author: 'Harris Newman',
    url: 'www.newmoon.com',
    likes: 55
  },
  {
    title: 'Blue Moon',
    author: 'Tony Fireman',
    url: 'www.bluemoon.com',
    likes: 65
  },
  {
    title: 'Blue Moon',
    author: 'Tony Fireman',
    url: 'www.bluemoon.com',
    likes: 64
  },
  {
    title: 'Golden Moon',
    author: 'Tony Fireman',
    url: 'www.bluemoon.com',
    likes: 67
  }
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb
};
