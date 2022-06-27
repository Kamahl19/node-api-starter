'use strict';

const { UserNotFoundError, IncorrectPassword } = require('../../common/messages/errors');

const User = require('../user/userModel');

module.exports = {
  login: async (email, password) => {
    const user = await User.findOne().byEmail(email).select('+password');

    if (!user) {
      throw UserNotFoundError();
    }

    if (!user.comparePassword(password)) {
      throw IncorrectPassword();
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

  isEmailAvailable: async (email) => {
    const user = await User.findOne().byEmail(email);

    return user ? false : true;
  },
};
