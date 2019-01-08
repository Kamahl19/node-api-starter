'use strict';

const { AuthTokenNotFoundError, AuthTokenInvalidError } = require('../../../messages/errors');
const { isAuthHeaderValid, getPayloadFromAuthHeader } = require('../');

/**
 * Verify user token
 */
module.exports = function verifyToken(req, res, next) {
  if (!req.headers || !req.headers.authorization) {
    throw AuthTokenNotFoundError();
  }

  if (!isAuthHeaderValid(req.headers.authorization)) {
    throw AuthTokenInvalidError();
  }

  req.jwtPayload = getPayloadFromAuthHeader(req.headers.authorization);

  next();
};
