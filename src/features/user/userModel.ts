const mongoose = require('mongoose');

import { generateJWTToken } from '../../common/services/auth/index';

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

export default mongoose.model('User', schema);
