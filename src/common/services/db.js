'use strict';

const mongoose = require('mongoose');

const { mongo, isDev } = require('../../config');
const logger = require('./logger');

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
  logger.info('MongoDB connected');
});

mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  logger.error(err);
});

module.exports = {
  connect: () => {
    mongoose.set('debug', isDev);

    return mongoose.connect(mongo.url, {
      promiseLibrary: global.Promise,
    });
  },

  closeConnection: (cb) => {
    mongoose.connection.close(() => {
      cb();
    });
  },
};
