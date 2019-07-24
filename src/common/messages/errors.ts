import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  Validation,
} from 'common/apiErrors';

export const PageNotFoundError = () => new NotFoundError('Page not found');

export const UserNotFoundError = () => new NotFoundError('Requested user does not exist.');

export const ActivationTokenInvalidError = () =>
  new ForbiddenError('Activation token is invalid or has expired.');

export const PasswordResetTokenInvalidError = () =>
  new ForbiddenError('Password reset token is invalid or has expired.');

export const LoginCredentialsError = () => new UnauthorizedError('Login credentials are wrong.');

export const NotAllowedAccessError = () =>
  new UnauthorizedError('You are not allowed to access this page.');

export const AuthTokenNotFoundError = () =>
  new UnauthorizedError('No authorization token was found.');

export const AuthTokenInvalidError = () =>
  new UnauthorizedError('Format of the Authorization header is invalid.');

export const RequestNotValidError = (message: string, validation: Validation) =>
  new BadRequestError(message, validation);
