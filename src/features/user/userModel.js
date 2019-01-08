'use strict';

const mongoose = require('mongoose');

const { generateJWTToken } = require('../../common/services/auth');

const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    passwordResetToken: String,
    passwordResetExpires: Date,
    isActive: { type: Boolean, default: false },
    activationToken: String,
    activationExpires: Date,
  },
  { timestamps: true }
);

/**
 * Methods
 */
schema.methods.getAuthToken = function() {
  return generateJWTToken(this.id);
};

schema.methods.getPublicData = function() {
  const { id, email, isActive } = this;
  return { id, email, isActive };
};

module.exports = mongoose.model('User', schema);
