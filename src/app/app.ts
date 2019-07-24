import express from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';

const healthcheck = require('express-healthcheck');

import config from '../config';
import routes from '../app/routes';
import { normalizePort } from '../common/helpers';
import accessLogger from '../common/services/accessLogger';
import {
  requestValidationErrorHandler,
  notFoundErrorHandler,
  expressErrorHandler,
} from './middleware/errorHandlers';

const app = express();

app.set('port', normalizePort(process.env.PORT!));

app.use(accessLogger);

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

export default app;
