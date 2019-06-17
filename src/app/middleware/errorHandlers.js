'use strict';

const httpStatus = require('http-status');
const { isCelebrate } = require('celebrate');
const escapeHtml = require('escape-html');

const { isDev } = require('../../config');
const logger = require('../../common/services/logger');
const { PageNotFoundError, RequestNotValidError } = require('../../common/messages/errors');

module.exports = {
  /**
   * Catch request params, body, headers & query validation errors
   */
  requestValidationErrorHandler: (err, _req, _res, _next) => {
    if (!isCelebrate(err)) {
      throw err;
    }

    const { joi, meta } = err;

    const validation = {
      source: meta.source,
      keys: [],
      messages: [],
    };

    if (joi.details) {
      joi.details.forEach(({ path, message }) => {
        validation.keys.push(escapeHtml(path.join('.')));
        validation.messages.push(message);
      });
    }

    throw RequestNotValidError(joi.message, validation);
  },

  /**
   * Catch 404 and forward to error handler
   */
  notFoundErrorHandler: (_req, _res, _next) => {
    throw PageNotFoundError();
  },

  /**
   * Log and return error
   */
  expressErrorHandler: (err, req, res, _next) => {
    logger.error(err);

    res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);

    res.json({
      message: err.message,
      error: isDev() ? err : {},
    });
  },
};
