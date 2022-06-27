'use strict';

const router = require('express').Router();

const validator = require('../../common/services/validator');
const verifyToken = require('../../common/services/auth/middleware/verifyToken');
const isOwnUserId = require('./middleware/isOwnUserId');
const controller = require('./userController');
const schema = require('./userSchema');

router.get(
  '/user/:userId',
  verifyToken,
  isOwnUserId,
  validator(schema.getUser),
  controller.getUser
);

router.post('/user', validator(schema.signUp), controller.signUp);

router.patch('/user/confirm-email/:token', validator(schema.confirmEmail), controller.confirmEmail);

router.patch(
  '/user/:userId/password',
  verifyToken,
  isOwnUserId,
  validator(schema.changePassword),
  controller.changePassword
);

router.post(
  '/user/forgot-password',
  validator(schema.forgottenPassword),
  controller.forgottenPassword
);

router.patch('/user/reset-password', validator(schema.resetPassword), controller.resetPassword);

module.exports = router;
