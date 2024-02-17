'use strict';

const router = require('express').Router();

const validator = require('../../common/services/validator');
const verifyAuthorizationHeader = require('../../common/services/auth/middleware/verifyAuthorizationHeader');
const controller = require('./authController');
const schema = require('./authSchema');

router.post('/auth/login', validator(schema.login), controller.login);

router.patch('/auth/relogin', verifyAuthorizationHeader, controller.relogin);

router.post('/auth/logout', verifyAuthorizationHeader, controller.logout);

router.get(
  '/auth/email-availability/:email',
  validator(schema.emailAvailability),
  controller.emailAvailability
);

module.exports = router;
