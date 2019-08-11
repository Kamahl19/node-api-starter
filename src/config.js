'use strict';

const {
  NODE_ENV = 'development',
  MONGO_URL,
  MAILGUN_API_KEY,
  JWT_SECRET,
  LOG_LEVEL,
  PORT,
} = process.env;

const IS_DEV = NODE_ENV === 'development';

module.exports = {
  appName: 'starter',
  auth: {
    jwtTokenExpireInSec: 24 * 60 * 60, // 1 day
    passwordResetExpireInMs: 60 * 60 * 1000, // 1 hour
    activationExpireInMs: 24 * 60 * 60 * 1000, // 1 day
    saltRounds: 10,
    jwtSecret: JWT_SECRET,
  },
  cors: {
    origin: 'http://localhost:3000', // set undefined if frontend is being served by backend
    methods: 'POST,GET,PUT,OPTIONS,DELETE',
    allowedHeaders: 'Timezone-Offset,Origin,X-Requested-With,Content-Type,Accept,Authorization',
  },
  enviroment: NODE_ENV,
  logLevel: LOG_LEVEL,
  mail: {
    from: {
      name: 'Your Name',
      address: 'youremail@example.com',
    },
  },
  mailgun: {
    apiKey: MAILGUN_API_KEY,
    domain: undefined, // One of your domain names listed at your https://mailgun.com/app/domains
  },
  mongo: {
    url: MONGO_URL,
  },
  port: normalizePort(PORT),
  staticMaxAge: IS_DEV ? 0 : '1d',
  IS_DEV,
};

function normalizePort(val) {
  const port = parseInt(val, 10);

  // Named pipe
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
