'use strict';

const mongoose = require('mongoose');

const logger = require('./logger');

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
  logger.info('MongoDB connected');
});

mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB disconnected');
});

mongoose.connection.on('error', err => {
  logger.error(err);
});

module.exports = {
  connect: () =>
    mongoose.connect(
      process.env.MONGO_URL,
      {
        promiseLibrary: global.Promise,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    ),

  closeConnection: cb => {
    mongoose.connection.close(() => {
      cb();
    });
  },
};
