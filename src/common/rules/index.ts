const { Joi } = require('celebrate');

export const objectId = Joi.string()
  .hex()
  .length(24);

export const uuidv4 = Joi.string().guid('uuidv4');

export const email = Joi.string()
  .email()
  .max(255);

export const password = Joi.string().min(6);
