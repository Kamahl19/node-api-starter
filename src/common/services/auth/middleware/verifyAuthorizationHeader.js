'use strict';

const { AuthHeaderNotFoundError, AuthTokenInvalidError } = require('../../../messages/errors');
const { isAuthHeaderValid, getPayloadFromAuthHeader } = require('../');

/**
 * Verify authorization header
 */
module.exports = function verifyAuthorizationHeader(req, res, next) {
  if (!req.headers || !req.headers.authorization) {
    throw AuthHeaderNotFoundError();
  }

  if (!isAuthHeaderValid(req.headers.authorization)) {
    throw AuthTokenInvalidError();
  }

  req.jwtPayload = getPayloadFromAuthHeader(req.headers.authorization);

  next();
};
