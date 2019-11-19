'use strict';

const { Joi } = require('celebrate');

const { email, password, objectId, uuidv4 } = require('../../common/rules');

module.exports = {
  signUp: {
    body: Joi.object().keys({
      email: email.required(),
      password: password.required(),
    }),
  },

  activate: {
    params: Joi.object().keys({
      userId: objectId.required(),
      activationToken: uuidv4.required(),
    }),
  },

  login: {
    body: Joi.object().keys({
      email: email.required(),
      password: password.required(),
    }),
  },

  forgottenPassword: {
    body: Joi.object().keys({
      email: email.required(),
    }),
  },

  resetPassword: {
    body: Joi.object().keys({
      email: email.required(),
      password: password.required(),
      passwordResetToken: uuidv4.required(),
    }),
  },
};
