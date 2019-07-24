import { Response } from 'express';
import { NextFunction } from 'express-serve-static-core';

import { AuthTokenNotFoundError, AuthTokenInvalidError } from '../../../messages/errors';
import { isAuthHeaderValid, getPayloadFromAuthHeader } from '../index';

import { Req } from '../../../../types';

/**
 * Verify user token
 */
export default function verifyToken(req: Req, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization) {
    throw AuthTokenNotFoundError();
  }

  if (!isAuthHeaderValid(req.headers.authorization)) {
    throw AuthTokenInvalidError();
  }

  req.jwtPayload! = getPayloadFromAuthHeader(req.headers.authorization);

  next();
}
