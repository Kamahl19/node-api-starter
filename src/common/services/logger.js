'use strict';

const pino = require('pino');

const { IS_DEV } = require('../../config');

module.exports = pino({
  prettyPrint: IS_DEV,
});
