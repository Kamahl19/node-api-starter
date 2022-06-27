'use strict';

const mongoose = require('mongoose');

const { generateJWTToken, comparePassword, hashPassword } = require('../../common/services/auth');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: Date,
    isConfirmed: { type: Boolean, default: false },
    confirmationToken: { type: String, select: false },
    confirmationExpires: Date,
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
        delete ret.confirmationToken;
        delete ret.confirmationExpires;
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

userSchema.query.byConfirmationToken = function (confirmationToken) {
  return this.where({ confirmationToken });
};

userSchema.query.byPasswordResetToken = function (passwordResetToken) {
  return this.where({ passwordResetToken });
};

userSchema.query.wherePasswordResetNotExpired = function () {
  return this.where('passwordResetExpires').gt(Date.now());
};

userSchema.query.whereConfirmationNotExpired = function () {
  return this.where('confirmationExpires').gt(Date.now());
};

module.exports = mongoose.model('User', userSchema);
