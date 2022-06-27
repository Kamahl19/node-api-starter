'use strict';

const router = require('express').Router();

router.use('/', require('../features/auth/authRoutes'));
router.use('/', require('../features/user/userRoutes'));

module.exports = router;
