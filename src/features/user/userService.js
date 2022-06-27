'use strict';

const uuid = require('uuid');

const mailer = require('../../common/services/mailer');
const {
  forgottenPasswordMail,
  resetPasswordMail,
  confirmationMail,
} = require('../../common/messages/mails');
const {
  UserNotFoundError,
  IncorrectPassword,
  TokenInvalidError,
  UserAlreadyExistsError,
} = require('../../common/messages/errors');
const {
  auth: { confirmationTokenExpireInMs, passwordResetTokenExpireInMs },
} = require('../../config');

const User = require('./userModel');

module.exports = {
  getUser: async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
      throw TokenInvalidError();
    }

    return user;
  },

  createUser: async (userData, origin) => {
    if (await User.findOne().byEmail(userData.email)) {
      throw UserAlreadyExistsError();
    }

    const token = uuid.v4();

    const user = new User({
      email: userData.email,
      password: userData.password,
      confirmationToken: token,
      confirmationExpires: Date.now() + confirmationTokenExpireInMs,
    });

    await user.save();

    mailer.sendMail(
      user.email,
      confirmationMail({
        origin,
        token,
      })
    );

    return user;
  },

  confirmEmail: async (token) => {
    const user = await User.findOne()
      .byConfirmationToken(token)
      .where({ isConfirmed: false })
      .whereConfirmationNotExpired();

    if (!user) {
      throw TokenInvalidError();
    }

    user.isConfirmed = true;
    user.confirmationToken = undefined;
    user.confirmationExpires = undefined;

    await user.save();

    return user;
  },

  changePassword: async (userId, password, currentPassword) => {
    const user = await User.findById(userId).select('+password');

    if (!user) {
      throw UserNotFoundError();
    }

    if (!user.comparePassword(currentPassword)) {
      throw IncorrectPassword();
    }

    user.password = password;

    await user.save();

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

  resetPassword: async (token, password) => {
    const user = await User.findOne().byPasswordResetToken(token).wherePasswordResetNotExpired();

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
