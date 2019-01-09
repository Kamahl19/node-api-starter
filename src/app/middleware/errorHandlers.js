'use strict';

const httpStatus = require('http-status');
const { isCelebrate } = require('celebrate');

const { isDev } = require('../../config');
const logger = require('../../common/services/logger');
const { PageNotFoundError, RequestNotValidError } = require('../../common/messages/errors');

module.exports = {
  /**
   * Catch request params, body, headers & query validation errors
   */
  requestValidationErrorHandler: (err, _req, _res, _next) => {
    if (isCelebrate(err)) {
      const validation = {
        source: err._meta.source,
        ...(err.details
          ? err.details.reduce(
              (acc, { path, message }) => ({
                keys: [...acc.keys, path.join('.')],
                messages: [...acc.messages, message],
              }),
              { keys: [], messages: [] }
            )
          : {}),
      };

      throw RequestNotValidError(err.message, validation);
    }

    throw err;
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
