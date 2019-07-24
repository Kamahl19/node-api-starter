import { NextFunction, Request, Response } from 'express';
const httpStatus = require('http-status');
const { isCelebrate } = require('celebrate');
const escapeHtml = require('escape-html');

const { isDev } = require('config');
const logger = require('common/services/logger');
const { PageNotFoundError, RequestNotValidError } = require('common/messages/errors');

/**
 * Catch request params, body, headers & query validation errors
 */
export const requestValidationErrorHandler = (
  err: any,
  _req: Request,
  _res: Response,
  _next: NextFunction
) => {
  if (!isCelebrate(err)) {
    throw err;
  }

  const { joi, meta } = err;

  const validation: {
    source: string;
    keys: string[];
    messages: string[];
  } = {
    source: meta.source,
    keys: [],
    messages: [],
  };

  if (joi.details) {
    joi.details.forEach(({ path, message }: { path: any; message: any }) => {
      validation.keys.push(escapeHtml(path.join('.')));
      validation.messages.push(message);
    });
  }

  throw RequestNotValidError(joi.message, validation);
};

/**
 * Catch 404 and forward to error handler
 */
export const notFoundErrorHandler = (_req: Request, _res: Response, _next: NextFunction) => {
  throw PageNotFoundError();
};

/**
 * Log and return error
 */
export const expressErrorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  logger.error(err);

  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);

  res.json({
    message: err.message,
    error: isDev() ? err : {},
  });
};
