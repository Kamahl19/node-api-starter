'use strict';

const httpStatus = require('http-status');
const ExtendableError = require('es6-error');

module.exports = {
  /**
   * UnauthorizedError 401
   */
  UnauthorizedError: class UnauthorizedError extends ExtendableError {
    constructor(message) {
      super(message);
      this.status = httpStatus.UNAUTHORIZED;
    }
  },

  /**
   * ForbiddenError 403
   */
  ForbiddenError: class ForbiddenError extends ExtendableError {
    constructor(message) {
      super(message);
      this.status = httpStatus.FORBIDDEN;
    }
  },

  /**
   * NotFoundError 404
   */
  NotFoundError: class NotFoundError extends ExtendableError {
    constructor(message) {
      super(message);
      this.status = httpStatus.NOT_FOUND;
    }
  },

  /**
   * Conflict 409
   */
  Conflict: class Conflict extends ExtendableError {
    constructor(message) {
      super(message);
      this.status = httpStatus.CONFLICT;
    }
  },
};
