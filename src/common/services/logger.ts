const bunyan = require('bunyan');

const { createLogsDirectory } = require('../helpers');

const logDirectory = createLogsDirectory();

export default bunyan.createLogger({
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
