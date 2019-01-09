'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../../../config');

function parseAuthHeader(authHeader) {
  const [bearer, token] = authHeader.split(' ');
  return { bearer, token };
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

  generateJWTToken: (subject, expiresIn = config.auth.jwtTokenExpireInSec) =>
    jwt.sign({}, process.env.JWT_SECRET, { subject, expiresIn }),

  hashPassword: async password => {
    const salt = await bcrypt.genSalt(config.auth.saltRounds);
    return await bcrypt.hash(password, salt);
  },

  comparePassword: (password, hash) => bcrypt.compareSync(password, hash),
};
