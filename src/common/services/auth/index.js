'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {
  auth: { jwtTokenExpireInSec, saltRounds, jwtSecret },
} = require('../../../config');

function parseAuthHeader(authHeader) {
  const [bearer, token] = authHeader.split(' ');
  return { bearer, token };
}

module.exports = {
  isAuthHeaderValid: (authHeader) => {
    const { bearer, token } = parseAuthHeader(authHeader);
    return !!(/^Bearer$/i.test(bearer) && token);
  },

  getPayloadFromAuthHeader: (authHeader) => {
    const { token } = parseAuthHeader(authHeader);
    return jwt.verify(token, jwtSecret);
  },

  generateJWTToken: (subject, expiresIn = jwtTokenExpireInSec) =>
    jwt.sign({}, jwtSecret, { subject, expiresIn }),

  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  },

  comparePassword: (password, hash) => bcrypt.compareSync(password, hash),
};
