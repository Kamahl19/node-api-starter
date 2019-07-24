const uuidv4 = require('uuid/v4');

const config = require('../../config');
const mailer = require('../../common/services/mailer');
const { comparePassword, hashPassword } = require('../../common/services/auth');
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
} = require('../../common/messages/errors');
const User = require('./userModel');

export const getUserById = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw UserNotFoundError();
  }

  return user;
};

export const createUser = async (
  userData: { password: string; email: string },
  origin?: string
) => {
  const password = await hashPassword(userData.password);

  const user = new User({
    email: userData.email.toLowerCase(),
    password,
    activationToken: uuidv4(),
    activationExpires: Date.now() + config.auth.activationExpireInMs,
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
};

export const activateUser = async (userId: string, activationToken: string) => {
  const newData = {
    isActive: true,
    activationToken: undefined,
    activationExpires: undefined,
  };

  const user = await User.findOneAndUpdate(
    {
      _id: userId,
      activationToken,
      isActive: false,
    },
    newData,
    {
      new: true,
      runValidators: true,
    }
  )
    .where('activationExpires')
    .gt(Date.now())
    .exec();

  if (!user) {
    throw ActivationTokenInvalidError();
  }

  return user;
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne(
    {
      email: email.toLowerCase(),
    },
    '+password'
  );

  if (!user) {
    throw UserNotFoundError();
  }

  if (!comparePassword(password, user.password)) {
    throw LoginCredentialsError();
  }

  return user;
};

export const forgottenPassword = async (email: string, origin?: string) => {
  const newData = {
    passwordResetToken: uuidv4(),
    passwordResetExpires: Date.now() + config.auth.passwordResetExpireInMs,
  };

  const user = await User.findOneAndUpdate(
    {
      email: email.toLowerCase(),
    },
    newData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    throw UserNotFoundError();
  }

  mailer.sendMail(
    user.email,
    forgottenPasswordMail({
      origin,
      passwordResetToken: user.passwordResetToken,
    })
  );
};

export const resetPassword = async (
  email: string,
  passwordResetToken: string,
  plainPassword: string
) => {
  const password = await hashPassword(plainPassword);

  const newData = {
    password,
    passwordResetToken: undefined,
    passwordResetExpires: undefined,
  };

  const user = await User.findOneAndUpdate(
    {
      email: email.toLowerCase(),
      passwordResetToken,
    },
    newData,
    {
      new: true,
      runValidators: true,
    }
  )
    .where('passwordResetExpires')
    .gt(Date.now())
    .exec();

  if (!user) {
    throw PasswordResetTokenInvalidError();
  }

  mailer.sendMail(user.email, resetPasswordMail({ email: user.email }), {});

  return user;
};
