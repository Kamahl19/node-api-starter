'use strict';

const { Joi } = require('celebrate');

module.exports = {
  objectId: Joi.string()
    .hex()
    .length(24),

  uuidv4: Joi.string().guid({ version: ['uuidv4'] }),

  email: Joi.string()
    .email()
    .max(255),

  password: Joi.string().min(6),
};
