'use strict';

const { NotAllowedAccessError } = require('../../../common/messages/errors');

/**
 * Verify if user is accesing his own user account
 */
module.exports = function isOwnUserId(req, res, next) {
  if (!req.jwtPayload || !req.params || req.jwtPayload.sub !== req.params.userId) {
    throw NotAllowedAccessError();
  }

  next();
};
