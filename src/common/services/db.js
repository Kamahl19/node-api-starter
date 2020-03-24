'use strict';

const mongoose = require('mongoose');

const logger = require('./logger');
const { mongo, IS_DEV } = require('../../config');

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
    mongoose.set('debug', IS_DEV);

    return mongoose.connect(mongo.url, {
      promiseLibrary: global.Promise,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  },

  closeConnection: (cb) => {
    mongoose.connection.close(() => {
      cb();
    });
  },
};
