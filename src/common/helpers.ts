import * as fs from 'fs';
import * as path from 'path';
import { once } from 'lodash';

/**
 * Normalize a port into a number, string, or false.
 */
export const normalizePort = (val: string) => {
  const port = parseInt(val, 10);

  // Named pipe
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

/**
 * Create directory for log files
 */
export const createLogsDirectory = once(() => {
  const logDirectory = process.env.LOG_DIR || path.resolve('./logs');

  try {
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
  } catch (e) {
    console.error(`Cannot create log directory: ${e}`); // eslint-disable-line no-console
  }

  return logDirectory;
});
