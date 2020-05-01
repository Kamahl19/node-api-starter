'use strict';

const pino = require('pino');

const { isDev, appName, logLevel } = require('../../config');

module.exports = pino({
  name: appName,
  level: logLevel,
  prettyPrint: isDev,
});
