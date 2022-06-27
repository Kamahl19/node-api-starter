'use strict';

const {
  getUser,
  createUser,
  confirmEmail,
  changePassword,
  forgottenPassword,
  resetPassword,
} = require('./userService');

module.exports = {
  getUser: async (req, res) => {
    const { userId } = req.params;

    const user = await getUser(userId);

    return res.json({
      user: user.toJSON(),
    });
  },

  signUp: async (req, res) => {
    const { email, password } = req.body;

    const user = await createUser({ email, password }, req.headers.origin);

    return res.json({
      user: user.toJSON(),
    });
  },

  confirmEmail: async (req, res) => {
    const { token } = req.params;

    await confirmEmail(token);

    return res.json(true);
  },

  changePassword: async (req, res) => {
    const userId = req.jwtPayload.sub;
    const { password, currentPassword } = req.body;

    const user = await changePassword(userId, password, currentPassword);

    return res.json({
      user: user.toJSON(),
    });
  },

  forgottenPassword: async (req, res) => {
    const { email } = req.body;

    await forgottenPassword(email, req.headers.origin);

    return res.json(true);
  },

  resetPassword: async (req, res) => {
    const { token, password } = req.body;

    await resetPassword(token, password);

    return res.json(true);
  },
};
