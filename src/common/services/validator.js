'use strict';

const { celebrate } = require('celebrate');

module.exports = (schema) => celebrate(schema, { abortEarly: false });
