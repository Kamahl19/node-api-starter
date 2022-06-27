'use strict';

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const corsMiddleware = require('cors');
const healthcheck = require('express-healthcheck');
const pino = require('pino-http');

const { cors, staticMaxAge, port } = require('../config');
const routes = require('../app/routes');
const logger = require('../common/services/logger');
const {
  notFoundErrorHandler,
  expressErrorHandler,
  celebrateErrorHandler,
} = require('./middleware/errorHandlers');

const app = express();

app.set('port', port);

app.use(pino({ logger }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());

if (cors && cors.origin) {
  app.use(corsMiddleware(cors));
}

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  '/',
  express.static(path.resolve(__dirname, '..', '..', 'public'), {
    maxAge: staticMaxAge,
  })
);

app.use('/healthcheck', healthcheck());

app.use('/api', routes);

app.use(celebrateErrorHandler);
app.use(notFoundErrorHandler);
app.use(expressErrorHandler);

module.exports = app;
