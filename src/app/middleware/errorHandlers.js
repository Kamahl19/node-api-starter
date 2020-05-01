'use strict';

const httpStatus = require('http-status');

const { isDev } = require('../../config');
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

    res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);

    res.json({
      message: err.message,
      error: isDev ? err : {},
    });
  },
};
