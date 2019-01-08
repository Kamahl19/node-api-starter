'use strict';

const bunyan = require('bunyan');

const { createLogsDirectory } = require('../helpers');

const logDirectory = createLogsDirectory();

module.exports = bunyan.createLogger({
  name: 'logger',
  streams: [
    {
      stream: process.stdout,
    },
    {
      type: 'rotating-file',
      path: logDirectory + '/logs.log',
    },
  ],
});

// Logging Levels: fatal, error, warn, info, debug, trace
