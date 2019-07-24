import { Request, Response } from 'express';

const { wrap } = require('async-middleware');

import * as service from './userService';

import { Req } from '../../types';

function getOrigin({ headers: { origin } }: Request): string | undefined {
  if (origin) {
    return typeof origin === 'string' ? origin : origin[0];
  }

  return origin;
}

export const signUp = wrap(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await service.createUser({ email, password }, getOrigin(req));

  return res.json({
    token: user.getAuthToken(),
    user: user.getPublicData(),
  });
});

export const activate = wrap(async (req: Request, res: Response) => {
  const { userId, activationToken } = req.params;

  const user = await service.activateUser(userId, activationToken);

  return res.json({
    token: user.getAuthToken(),
    user: user.getPublicData(),
  });
});

export const login = wrap(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await service.login(email, password);

  return res.json({
    token: user.getAuthToken(),
    user: user.getPublicData(),
  });
});

export const relogin = wrap(async (req: Req, res: Response) => {
  const userId = req.jwtPayload!.sub; // TODO should always have userId

  const user = await service.getUserById(userId);

  return res.json({
    token: user.getAuthToken(),
    user: user.getPublicData(),
  });
});

export const forgottenPassword = wrap(async (req: Request, res: Response) => {
  const { email } = req.body;

  await service.forgottenPassword(email, getOrigin(req));

  return res.end();
});

export const resetPassword = wrap(async (req: Request, res: Response) => {
  const { email, passwordResetToken, password } = req.body;

  const user = await service.resetPassword(email, passwordResetToken, password);

  return res.json({
    token: user.getAuthToken(),
    user: user.getPublicData(),
  });
});
