import { Response, NextFunction } from 'express';

import { NotAllowedAccessError } from 'common/messages/errors';
import { Req } from 'types';

/**
 * Verify if user is accesing his own user account
 */
export default function isOwnUserId(req: Req, res: Response, next: NextFunction) {
  if (!req.jwtPayload || !req.params || req.jwtPayload.sub !== req.params.userId) {
    throw NotAllowedAccessError();
  }

  next();
}
