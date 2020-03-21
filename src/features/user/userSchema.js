'use strict';

const { Joi, Segments } = require('celebrate');

const { email, password, objectId, uuidv4 } = require('../../common/rules');

module.exports = {
  signUp: {
    [Segments.BODY]: Joi.object().keys({
      email: email.required(),
      password: password.required(),
    }),
  },

  activate: {
    [Segments.PARAMS]: Joi.object().keys({
      userId: objectId.required(),
      activationToken: uuidv4.required(),
    }),
  },

  login: {
    [Segments.BODY]: Joi.object().keys({
      email: email.required(),
      password: password.required(),
    }),
  },

  forgottenPassword: {
    [Segments.BODY]: Joi.object().keys({
      email: email.required(),
    }),
  },

  resetPassword: {
    [Segments.BODY]: Joi.object().keys({
      email: email.required(),
      password: password.required(),
      passwordResetToken: uuidv4.required(),
    }),
  },
};
