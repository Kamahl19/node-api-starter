const httpStatus = require('http-status');
const ExtendableError = require('es6-error');

export type Validation = {
  source: string;
  keys: string[];
  messages: string[];
};

class Error extends ExtendableError {
  status?: string;
  message?: string;
  validation?: Validation;

  constructor(message: string) {
    super(message);
  }
}

/**
 * BadRequestError 400
 */
export class BadRequestError extends Error {
  constructor(message: string, validation: Validation) {
    super(message);
    this.status = httpStatus.BAD_REQUEST;
    this.validation = validation;
  }
}

/**
 * UnauthorizedError 401
 */
export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.status = httpStatus.UNAUTHORIZED;
  }
}

/**
 * ForbiddenError 403
 */
export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.status = httpStatus.FORBIDDEN;
  }
}

/**
 * NotFoundError 404
 */
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.status = httpStatus.NOT_FOUND;
  }
}
