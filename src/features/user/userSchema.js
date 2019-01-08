'use strict';

const { Joi } = require('celebrate');

const { email, password, objectId, hexToken } = require('../../common/rules');

module.exports = {
  signUpSchema: {
    body: Joi.object().keys({
      email: email.required(),
      password: password.required(),
    }),
  },

  activateSchema: {
    params: Joi.object().keys({
      userId: objectId.required(),
      activationToken: hexToken.required(),
    }),
  },

  loginSchema: {
    body: Joi.object().keys({
      email: email.required(),
      password: password.required(),
    }),
  },

  forgottenPasswordSchema: {
    body: Joi.object().keys({
      email: email.required(),
    }),
  },

  resetPasswordSchema: {
    body: Joi.object().keys({
      email: email.required(),
      password: password.required(),
      passwordResetToken: hexToken.required(),
    }),
  },
};
