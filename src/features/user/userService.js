'use strict';

const uuid = require('uuid');

const mailer = require('../../common/services/mailer');
const {
  forgottenPasswordMail,
  resetPasswordMail,
  activationMail,
} = require('../../common/messages/mails');
const {
  UserNotFoundError,
  LoginCredentialsError,
  TokenInvalidError,
  UserAlreadyExistsError,
} = require('../../common/messages/errors');
const {
  auth: { activationTokenExpireInMs, passwordResetTokenExpireInMs },
} = require('../../config');

const User = require('./userModel');

module.exports = {
  createUser: async (userData, origin) => {
    if (await User.findOne().byEmail(userData.email)) {
      throw UserAlreadyExistsError();
    }

    const token = uuid.v4();

    const user = new User({
      email: userData.email,
      password: userData.password,
      activationToken: token,
      activationExpires: Date.now() + activationTokenExpireInMs,
    });

    await user.save();

    mailer.sendMail(
      user.email,
      activationMail({
        origin,
        userId: user.id,
        token,
      })
    );

    return user;
  },

  activateUser: async (userId, token) => {
    const user = await User.findById(userId)
      .where({
        activationToken: token,
        isActive: false,
      })
      .whereActivationNotExpired();

    if (!user) {
      throw TokenInvalidError();
    }

    user.isActive = true;
    user.activationToken = undefined;
    user.activationExpires = undefined;

    await user.save();

    return user;
  },

  login: async (email, password) => {
    const user = await User.findOne().byEmail(email).select('+password');

    if (!user) {
      throw UserNotFoundError();
    }

    if (!user.comparePassword(password)) {
      throw LoginCredentialsError();
    }

    return user;
  },

  relogin: async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
      throw UserNotFoundError();
    }

    return user;
  },

  forgottenPassword: async (email, origin) => {
    const user = await User.findOne().byEmail(email);

    if (!user) {
      throw UserNotFoundError();
    }

    const token = uuid.v4();

    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + passwordResetTokenExpireInMs;

    await user.save();

    mailer.sendMail(
      user.email,
      forgottenPasswordMail({
        origin,
        token,
      })
    );

    return user;
  },

  resetPassword: async (email, token, password) => {
    const user = await User.findOne()
      .byEmail(email)
      .where({ passwordResetToken: token })
      .wherePasswordResetNotExpired();

    if (!user) {
      throw TokenInvalidError();
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    mailer.sendMail(
      user.email,
      resetPasswordMail({
        email: user.email,
      })
    );

    return user;
  },
};
