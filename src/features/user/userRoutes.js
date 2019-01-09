'use strict';

const router = require('express').Router();

const validator = require('../../common/services/validator');
const verifyToken = require('../../common/services/auth/middleware/verifyToken');
const {
  signUp,
  activate,
  login,
  relogin,
  forgottenPassword,
  resetPassword,
} = require('./userController');
const {
  signUpSchema,
  activateSchema,
  loginSchema,
  forgottenPasswordSchema,
  resetPasswordSchema,
} = require('./userSchema');

router.post('/users', validator(signUpSchema), signUp);

router.get('/users/:userId/activate/:activationToken', validator(activateSchema), activate);

router.post('/auth/login', validator(loginSchema), login);

router.get('/auth/relogin', verifyToken, relogin);

router.post('/auth/forgotten-password', validator(forgottenPasswordSchema), forgottenPassword);

router.post('/auth/reset-password', validator(resetPasswordSchema), resetPassword);

module.exports = router;
