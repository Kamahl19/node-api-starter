'use strict';

module.exports = {
  isDev,
  isProd,
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
    maxAge: isProd() ? '1d' : 0,
  },
};

function isDev() {
  return process.env.NODE_ENV === 'development';
}

function isProd() {
  return process.env.NODE_ENV === 'production';
}
