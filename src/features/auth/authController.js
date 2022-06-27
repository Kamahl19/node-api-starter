'use strict';

const { login, relogin, isEmailAvailable } = require('./authService');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await login(email, password);

    return res.json({
      token: user.getAuthToken(),
      userId: user.id,
    });
  },

  relogin: async (req, res) => {
    const user = await relogin(req.jwtPayload.sub);

    return res.json({
      token: user.getAuthToken(),
      userId: user.id,
    });
  },

  logout: async (req, res) => {
    return res.json(true);
  },

  emailAvailability: async (req, res) => {
    const { email } = req.params;

    const isAvailable = await isEmailAvailable(email);

    return res.json(isAvailable);
  },
};
