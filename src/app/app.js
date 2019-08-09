'use strict';

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const healthcheck = require('express-healthcheck');
const expressPino = require('express-pino-logger');

const config = require('../config');
const routes = require('../app/routes');
const logger = require('../common/services/logger');
const {
  requestValidationErrorHandler,
  notFoundErrorHandler,
  expressErrorHandler,
} = require('./middleware/errorHandlers');

const app = express();

app.set('port', normalizePort(process.env.PORT));

app.use(
  expressPino({
    logger,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());

if (config.cors && config.cors.origin) {
  const cors = require('cors');
  app.use(cors(config.cors));
}

app.use(helmet());

app.use('/', express.static(path.resolve(__dirname, '..', '..', 'public'), config.static));

app.use('/healthcheck', healthcheck());

app.use('/api', routes);

app.use(requestValidationErrorHandler);
app.use(notFoundErrorHandler);
app.use(expressErrorHandler);

module.exports = app;

function normalizePort(val) {
  const port = parseInt(val, 10);

  // Named pipe
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
