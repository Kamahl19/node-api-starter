'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../../../config');

function parseAuthHeader(authHeader) {
  const parts = authHeader.split(' ');

  return {
    bearer: parts[0],
    token: parts[1],
  };
}

module.exports = {
  isAuthHeaderValid: authHeader => {
    const { bearer, token } = parseAuthHeader(authHeader);

    return !!(/^Bearer$/i.test(bearer) && token);
  },

  getPayloadFromAuthHeader: authHeader => {
    const { token } = parseAuthHeader(authHeader);

    return jwt.verify(token, process.env.JWT_SECRET);
  },

  generateJWTToken: subject => {
    const options = {
      expiresIn: config.auth.jwtTokenExpireInSec,
      subject,
    };

    return jwt.sign({}, process.env.JWT_SECRET, options);
  },

  hashPassword: password => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(config.auth.saltRounds, (err, salt) => {
        if (err) {
          return reject(err);
        }

        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            return reject(err);
          }

          resolve(hash);
        });
      });
    });
  },

  comparePassword: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  },
};
