'use strict';

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const corsMiddleware = require('cors');
const healthcheck = require('express-healthcheck');
const expressPino = require('express-pino-logger');

const { cors, staticMaxAge, port } = require('../config');
const routes = require('../app/routes');
const logger = require('../common/services/logger');
const {
  requestValidationErrorHandler,
  notFoundErrorHandler,
  expressErrorHandler,
} = require('./middleware/errorHandlers');

const app = express();

app.set('port', port);

app.use(
  expressPino({
    logger,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());

if (cors && cors.origin) {
  app.use(corsMiddleware(cors));
}

app.use(helmet());

app.use(
  '/',
  express.static(path.resolve(__dirname, '..', '..', 'public'), {
    maxAge: staticMaxAge,
  })
);

app.use('/healthcheck', healthcheck());

app.use('/api', routes);

app.use(requestValidationErrorHandler);
app.use(notFoundErrorHandler);
app.use(expressErrorHandler);

module.exports = app;
