'use strict';

const mongoose = require('mongoose');

const { generateJWTToken, comparePassword, hashPassword } = require('../../common/services/auth');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: Date,
    isActive: { type: Boolean, default: false },
    activationToken: { type: String, select: false },
    activationExpires: Date,
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
      versionKey: false,
      transform: function (_, ret) {
        delete ret._id;
        delete ret.password;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.activationToken;
        delete ret.activationExpires;
        return ret;
      },
    },
  }
);

/**
 * Hooks
 */
userSchema.pre('save', async function save(next) {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }

  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }

  next();
});

/**
 * Schema methods
 */
userSchema.methods.getAuthToken = function () {
  return generateJWTToken(this.id);
};

userSchema.methods.comparePassword = function (password) {
  return comparePassword(password, this.password);
};

/**
 * Query methods
 */
userSchema.query.byEmail = function (email) {
  return this.where({ email: email.toLowerCase() });
};

userSchema.query.wherePasswordResetNotExpired = function () {
  return this.where('passwordResetExpires').gt(Date.now());
};

userSchema.query.whereActivationNotExpired = function () {
  return this.where('activationExpires').gt(Date.now());
};

module.exports = mongoose.model('User', userSchema);
