const router = require('express').Router();

import validator from 'common/services/validator';
import verifyToken from 'common/services/auth/middleware/verifyToken';
import {
  signUp,
  activate,
  login,
  relogin,
  forgottenPassword,
  resetPassword,
} from './userController';
import {
  signUpSchema,
  activateSchema,
  loginSchema,
  forgottenPasswordSchema,
  resetPasswordSchema,
} from './userSchema';

router.post('/users', validator(signUpSchema), signUp);

router.get('/users/:userId/activate/:activationToken', validator(activateSchema), activate);

router.post('/auth/login', validator(loginSchema), login);

router.get('/auth/relogin', verifyToken, relogin);

router.post('/auth/forgotten-password', validator(forgottenPasswordSchema), forgottenPassword);

router.post('/auth/reset-password', validator(resetPasswordSchema), resetPassword);

export default router;
