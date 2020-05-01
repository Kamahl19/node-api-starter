'use strict';

require('./bootstrap');

const http = require('http');

const logger = require('./common/services/logger');
const db = require('./common/services/db');
const app = require('./app/app');
const { enviroment } = require('./config');

const server = http.createServer(app);

server.on('error', (err) => {
  logger.error(err);

  if (err.syscall !== 'listen') {
    throw err;
  }

  const bind = `Port ${app.get('port')}`;

  switch (err.code) {
    case 'EACCES':
      logger.fatal(`${bind} requires elevated privileges`);
      shutDown(1);
      break;

    case 'EADDRINUSE':
      logger.fatal(`${bind} is already in use asd`);
      shutDown(1);
      break;

    default:
      throw err;
  }
});

process.on('SIGINT', () => shutDown(0));
process.on('SIGTERM', () => shutDown(0));

function shutDown(code) {
  db.closeConnection(() => {
    logger.info('MongoDB connection is closed through app termination');
    process.exit(code); // eslint-disable-line no-process-exit
  });
}

db.connect().then(function startServer() {
  server.listen(app.get('port'), '0.0.0.0', () => {
    const addr = server.address();

    logger.info(`Listening on ${addr.address}:${addr.port}`);
    logger.info(`Environment on ${enviroment}`);
  });
});
