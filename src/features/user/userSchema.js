'use strict';

const { Joi, Segments } = require('celebrate');

const { email, password, objectId, jwtToken } = require('../../common/rules');

module.exports = {
  getUser: {
    [Segments.PARAMS]: Joi.object().keys({
      userId: objectId.required(),
    }),
  },

  signUp: {
    [Segments.BODY]: Joi.object().keys({
      email: email.required(),
      password: password.required(),
    }),
  },

  confirmEmail: {
    [Segments.PARAMS]: Joi.object().keys({
      token: jwtToken.required(),
    }),
  },

  changePassword: {
    [Segments.BODY]: Joi.object().keys({
      password: password.required(),
      currentPassword: password.required(),
    }),
  },

  forgottenPassword: {
    [Segments.BODY]: Joi.object().keys({
      email: email.required(),
    }),
  },

  resetPassword: {
    [Segments.BODY]: Joi.object().keys({
      password: password.required(),
      token: jwtToken.required(),
    }),
  },
};
