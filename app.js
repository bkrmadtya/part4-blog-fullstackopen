const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./utils/config');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs.controllers');
const userRouter = require('./controllers/users.controllers');
const logger = require('./utils/logger');

logger.info('connecting to ', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('Conneted to MongoDB server.');
  })
  .catch(error => {
    logger.error('Error connecting to MongoDB: ', error.message);
  });

app.use(bodyParser.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
