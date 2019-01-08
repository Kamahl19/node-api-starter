'use strict';

const { Joi } = require('celebrate');

module.exports = {
  objectId: Joi.string()
    .hex()
    .length(24),

  hexToken: Joi.string()
    .hex()
    .length(32),

  email: Joi.string()
    .email()
    .max(255),

  password: Joi.string().min(6),
};
