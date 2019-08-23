const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./utils/config');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Conneted to MongoDB server.');
  })
  .catch(error => {
    console.log('Error connecting to MongoDB: ', error.message);
  });

app.use(bodyParser.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
