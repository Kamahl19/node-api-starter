'use strict';

validateEnvVariables();

const IS_DEV = process.env.NODE_ENV === 'development';

const {
  NODE_ENV,
  MONGO_URL,
  JWT_SECRET,
  LOG_LEVEL = IS_DEV ? 'debug' : 'info',
  MAILGUN_API_KEY,
  PORT,
} = process.env;

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
  isDev: IS_DEV,
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
};

function normalizePort(val) {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : port;
}

function validateEnvVariables() {
  const requiredEnvVars = ['NODE_ENV', 'MONGO_URL', 'JWT_SECRET', 'PORT'];
  const nodeEnvOptions = ['development', 'production', 'test'];
  const logLevelOptions = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'];

  requiredEnvVars.forEach((name) => {
    if (process.env[name] === undefined || process.env[name] === '') {
      throw new Error(`Env variable ${name} is required but was not set.`);
    }
  });

  if (!nodeEnvOptions.includes(process.env.NODE_ENV)) {
    throw new Error(`Env variable NODE_ENV must be one of ${nodeEnvOptions.toString()}.`);
  }

  if (!logLevelOptions.includes(process.env.LOG_LEVEL)) {
    throw new Error(`Env variable LOG_LEVEL must be one of ${logLevelOptions.toString()}.`);
  }
}
