'use strict';

const { isCelebrateError } = require('celebrate');
const httpStatus = require('http-status');
const EscapeHtml = require('escape-html');

const { PageNotFoundError } = require('../../common/messages/errors');

module.exports = {
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
    req.log.error(err);

    const { status = httpStatus.INTERNAL_SERVER_ERROR, message = '' } = err;

    res.status(status);

    res.json({
      error: {
        status,
        message,
      },
    });
  },

  /**
   * Process validation error from Celebrate
   */
  celebrateErrorHandler: (err, req, res, next) => {
    if (!isCelebrateError(err)) {
      return next(err);
    }

    const status = httpStatus.BAD_REQUEST;

    const validation = {};

    for (const [segment, joiError] of err.details.entries()) {
      validation[segment] = {
        source: segment,
        keys: joiError.details.map((detail) => EscapeHtml(detail.path.join('.'))),
        message: joiError.message,
      };
    }

    return res.status(status).json({
      error: {
        status,
        message: err.message || '',
        validation,
      },
    });
  },
};
