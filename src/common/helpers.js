'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const once = require('lodash.once');

module.exports = {
  /**
   * Normalize a port into a number, string, or false.
   */
  normalizePort: val => {
    const port = parseInt(val, 10);

    // Named pipe
    if (isNaN(port)) {
      return val;
    }

    // Port number
    if (port >= 0) {
      return port;
    }

    return false;
  },

  /**
   * Generate Hex Token
   */
  generateHexToken: () => {
    return crypto.randomBytes(16).toString('hex');
  },

  /**
   * Create directory for log files
   */
  createLogsDirectory: once(() => {
    const logDirectory = process.env.LOG_DIR || path.resolve('./logs');

    try {
      fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
    } catch (e) {
      console.error(`Cannot create log directory: ${e}`); // eslint-disable-line no-console
    }

    return logDirectory;
  }),
};
