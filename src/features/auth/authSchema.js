'use strict';

const { Joi, Segments } = require('celebrate');

const { email, password } = require('../../common/rules');

module.exports = {
  login: {
    [Segments.BODY]: Joi.object().keys({
      email: email.required(),
      password: password.required(),
    }),
  },

  emailAvailability: {
    [Segments.PARAMS]: Joi.object().keys({
      email: email.required(),
    }),
  },
};
