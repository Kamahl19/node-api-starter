'use strict';

const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  Conflict,
} = require('../../common/apiErrors');

module.exports = {
  PageNotFoundError: () => new NotFoundError('Page not found'),

  UserNotFoundError: () => new NotFoundError('Requested user does not exist.'),

  ActivationTokenInvalidError: () =>
    new ForbiddenError('Activation token is invalid or has expired.'),

  PasswordResetTokenInvalidError: () =>
    new ForbiddenError('Password reset token is invalid or has expired.'),

  LoginCredentialsError: () => new UnauthorizedError('Login credentials are wrong.'),

  NotAllowedAccessError: () => new UnauthorizedError('You are not allowed to access this page.'),

  AuthTokenNotFoundError: () => new UnauthorizedError('No authorization token was found.'),

  AuthTokenInvalidError: () =>
    new UnauthorizedError('Format of the Authorization header is invalid.'),

  RequestNotValidError: (message, validation) => new BadRequestError(message, validation),

  UserAlreadyExistsError: () => new Conflict('User already exists'),
};
