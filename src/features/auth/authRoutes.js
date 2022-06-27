'use strict';

const router = require('express').Router();

const validator = require('../../common/services/validator');
const verifyToken = require('../../common/services/auth/middleware/verifyToken');
const controller = require('./authController');
const schema = require('./authSchema');

router.post('/auth/login', validator(schema.login), controller.login);

router.patch('/auth/relogin', verifyToken, controller.relogin);

router.post('/auth/logout', verifyToken, controller.logout);

router.get(
  '/auth/email-availability/:email',
  validator(schema.emailAvailability),
  controller.emailAvailability
);

module.exports = router;
