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
  ActivationTokenInvalidError,
  PasswordResetTokenInvalidError,
  UserAlreadyExistsError,
} = require('../../common/messages/errors');
const {
  auth: { activationExpireInMs, passwordResetExpireInMs },
} = require('../../config');

const User = require('./userModel');

module.exports = {
  createUser: async (userData, origin) => {
    if (await User.findOne().byEmail(userData.email)) {
      throw UserAlreadyExistsError();
    }

    const user = new User({
      email: userData.email,
      password: userData.password,
      activationToken: uuid.v4(),
      activationExpires: Date.now() + activationExpireInMs,
    });

    await user.save();

    mailer.sendMail(
      user.email,
      activationMail({
        origin,
        userId: user.id,
        activationToken: user.activationToken,
      })
    );

    return user;
  },

  activateUser: async (userId, activationToken) => {
    const user = await User.findById(userId)
      .where({ activationToken, isActive: false })
      .whereActivationNotExpired();

    if (!user) {
      throw ActivationTokenInvalidError();
    }

    user.isActive = true;
    user.activationToken = undefined;
    user.activationExpires = undefined;

    await user.save();

    return user;
  },

  login: async (email, password) => {
    const user = await User.findOne()
      .byEmail(email)
      .select('+password');

    if (!user) {
      throw UserNotFoundError();
    }

    if (!user.comparePassword(password)) {
      throw LoginCredentialsError();
    }

    return user;
  },

  relogin: async userId => {
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

    user.passwordResetToken = uuid.v4();
    user.passwordResetExpires = Date.now() + passwordResetExpireInMs;

    await user.save();

    mailer.sendMail(
      user.email,
      forgottenPasswordMail({
        origin,
        passwordResetToken: user.passwordResetToken,
      })
    );

    return user;
  },

  resetPassword: async (email, passwordResetToken, password) => {
    const user = await User.findOne()
      .byEmail(email)
      .where({ passwordResetToken })
      .wherePasswordResetNotExpired();

    if (!user) {
      throw PasswordResetTokenInvalidError();
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
