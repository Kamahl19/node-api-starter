'use strict';

const {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  Conflict,
} = require('../../common/apiErrors');

module.exports = {
  PageNotFoundError: () => new NotFoundError('Page not found'),

  UserNotFoundError: () => new NotFoundError('User does not exist.'),

  TokenInvalidError: () => new ForbiddenError('Token is invalid or has expired.'),

  IncorrectPassword: () => new UnauthorizedError('Incorrect password.'),

  NotAllowedAccessError: () => new UnauthorizedError('You are not allowed to access this page.'),

  AuthHeaderNotFoundError: () => new UnauthorizedError('No authorization header was found.'),

  AuthTokenInvalidError: () =>
    new UnauthorizedError('Format of the authorization header is invalid.'),

  UserAlreadyExistsError: () => new Conflict('User with this e-mail address already exists'),
};
