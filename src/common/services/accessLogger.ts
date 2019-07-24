import { Request, Response } from 'express';

const morgan = require('morgan');
const RotatingFileStream = require('rotating-file-stream');

import config from '../../config';
import { createLogsDirectory } from '../helpers';

const logDirectory = createLogsDirectory();

export default config.isDev()
  ? morgan('dev')
  : morgan('combined', {
      skip: (_: Request, res: Response) => res.statusCode < 400,
      stream: RotatingFileStream('access.log', {
        path: logDirectory,
        interval: '1d',
        maxFiles: 10,
      }),
    });
