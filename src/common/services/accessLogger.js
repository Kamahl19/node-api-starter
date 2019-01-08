const morgan = require('morgan');
const RotatingFileStream = require('rotating-file-stream');

const config = require('../../config');
const { createLogsDirectory } = require('../helpers');

const logDirectory = createLogsDirectory();

module.exports = config.isDev()
  ? morgan('dev')
  : morgan('combined', {
      skip: (_, res) => res.statusCode < 400,
      stream: RotatingFileStream('access.log', {
        path: logDirectory,
        interval: '1d',
        maxFiles: 10,
      }),
    });
