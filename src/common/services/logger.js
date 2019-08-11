'use strict';

const pino = require('pino');

const { IS_DEV, appName, logLevel } = require('../../config');

module.exports = pino({
  name: appName,
  level: logLevel,
  prettyPrint: IS_DEV,
});
