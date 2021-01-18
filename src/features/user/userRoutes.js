'use strict';

const router = require('express').Router();

const validator = require('../../common/services/validator');
const verifyToken = require('../../common/services/auth/middleware/verifyToken');
const controller = require('./userController');
const schema = require('./userSchema');

router.post('/users', validator(schema.signUp), controller.signUp);

router.get('/users/:userId/activate/:token', validator(schema.activate), controller.activate);

router.post('/auth/login', validator(schema.login), controller.login);

router.get('/auth/relogin', verifyToken, controller.relogin);

router.post(
  '/auth/forgotten-password',
  validator(schema.forgottenPassword),
  controller.forgottenPassword
);

router.post('/auth/reset-password', validator(schema.resetPassword), controller.resetPassword);

module.exports = router;
