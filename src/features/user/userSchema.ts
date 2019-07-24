const { Joi } = require('celebrate');
const { email, password, objectId, uuidv4 } = require('../../common/rules');

export const signUpSchema = {
  body: Joi.object().keys({
    email: email.required(),
    password: password.required(),
  }),
};

export const activateSchema = {
  params: Joi.object().keys({
    userId: objectId.required(),
    activationToken: uuidv4.required(),
  }),
};

export const loginSchema = {
  body: Joi.object().keys({
    email: email.required(),
    password: password.required(),
  }),
};

export const forgottenPasswordSchema = {
  body: Joi.object().keys({
    email: email.required(),
  }),
};

export const resetPasswordSchema = {
  body: Joi.object().keys({
    email: email.required(),
    password: password.required(),
    passwordResetToken: uuidv4.required(),
  }),
};
