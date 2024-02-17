'use strict';

const { Joi } = require('celebrate');

module.exports = {
  objectId: Joi.string().hex().length(24),

  email: Joi.string().email().max(255),

  password: Joi.string().min(6),

  jwtToken: Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/),
};
