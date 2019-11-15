'use strict';

const {
  createUser,
  activateUser,
  login,
  relogin,
  forgottenPassword,
  resetPassword,
} = require('./userService');

module.exports = {
  signUp: async (req, res) => {
    const { email, password } = req.body;

    const user = await createUser({ email, password }, req.headers.origin);

    return res.json({
      token: user.getAuthToken(),
      user: user.getPublicData(),
    });
  },

  activate: async (req, res) => {
    const { userId, activationToken } = req.params;

    const user = await activateUser(userId, activationToken);

    return res.json({
      token: user.getAuthToken(),
      user: user.getPublicData(),
    });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await login(email, password);

    return res.json({
      token: user.getAuthToken(),
      user: user.getPublicData(),
    });
  },

  relogin: async (req, res) => {
    const user = await relogin(req.jwtPayload.sub);

    return res.json({
      token: user.getAuthToken(),
      user: user.getPublicData(),
    });
  },

  forgottenPassword: async (req, res) => {
    const { email } = req.body;

    await forgottenPassword(email, req.headers.origin);

    return res.end();
  },

  resetPassword: async (req, res) => {
    const { email, passwordResetToken, password } = req.body;

    const user = await resetPassword(email, passwordResetToken, password);

    return res.json({
      token: user.getAuthToken(),
      user: user.getPublicData(),
    });
  },
};
