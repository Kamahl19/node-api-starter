'use strict';

require('dotenv').config();

require('express-async-errors');

const http = require('http');

const logger = require('./common/services/logger');
const db = require('./common/services/db');
const app = require('./app/app');

const server = http.createServer(app);

server.on('error', err => {
  logger.error(err);

  if (err.syscall !== 'listen') {
    throw err;
  }

  const bind = `${typeof port === 'string' ? 'Pipe' : 'Port'} ${app.get('port')}`;

  switch (err.code) {
    case 'EACCES':
      logger.fatal(`${bind} requires elevated privileges`);
      cleanShutDown(1);
      break;

    case 'EADDRINUSE':
      logger.fatal(`${bind} is already in use`);
      cleanShutDown(1);
      break;

    default:
      throw err;
  }
});

process.on('SIGINT', cleanShutDown);
process.on('SIGTERM', cleanShutDown);

function cleanShutDown(code = 0) {
  db.closeConnection(() => {
    logger.info('MongoDB connection is closed through app termination');
    process.exit(code); // eslint-disable-line no-process-exit
  });
}

db.connect().then(function startServer() {
  server.listen(app.get('port'), '0.0.0.0', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `${addr.address}:${addr.port}`;

    logger.info(`Listening on ${bind}`);
    logger.info(`Environment on ${process.env.NODE_ENV}`);
  });
});
