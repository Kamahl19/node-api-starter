'use strict';

const IS_DEV = process.env.NODE_ENV === 'development';

module.exports = {
  IS_DEV,
  mail: {
    from: {
      name: 'Your Name',
      address: 'youremail@example.com',
    },
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: 'POST,GET,PUT,OPTIONS,DELETE',
    allowedHeaders: 'Timezone-Offset,Origin,X-Requested-With,Content-Type,Accept,Authorization',
  },
  auth: {
    jwtTokenExpireInSec: 24 * 60 * 60, // 1 day
    passwordResetExpireInMs: 60 * 60 * 1000, // 1 hour
    activationExpireInMs: 24 * 60 * 60 * 1000, // 1 day
    saltRounds: 10,
  },
  static: {
    maxAge: IS_DEV ? 0 : '1d',
  },
};
