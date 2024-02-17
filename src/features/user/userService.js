'use strict';

const mailer = require('../../common/services/mailer');
const { generateJWTToken, verifyJWTToken } = require('../../common/services/auth');
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
      throw UserNotFoundError();
    }

    return user;
  },

  createUser: async (userData, origin) => {
    if (await User.findOne().byEmail(userData.email)) {
      throw UserAlreadyExistsError();
    }

    const user = new User({
      email: userData.email,
      password: userData.password,
      confirmationToken: generateJWTToken(undefined, confirmationTokenExpireInMs),
    });

    await user.save();

    mailer.sendMail(
      user.email,
      confirmationMail({
        origin,
        token: user.confirmationToken,
      })
    );

    return user;
  },

  confirmEmail: async (token) => {
    const user = await User.findOne().byConfirmationToken(token).where({ isConfirmed: false });

    if (!user || !verifyJWTToken(token)) {
      throw TokenInvalidError();
    }

    user.isConfirmed = true;
    user.confirmationToken = undefined;

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

    user.passwordResetToken = generateJWTToken(undefined, passwordResetTokenExpireInMs);

    await user.save();

    mailer.sendMail(
      user.email,
      forgottenPasswordMail({
        origin,
        token: user.passwordResetToken,
      })
    );

    return user;
  },

  resetPassword: async (token, password) => {
    const user = await User.findOne().byPasswordResetToken(token);

    if (!user || !verifyJWTToken(token)) {
      throw TokenInvalidError();
    }

    user.password = password;
    user.passwordResetToken = undefined;

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
