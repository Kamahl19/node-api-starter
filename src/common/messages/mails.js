'use strict';

module.exports = {
  forgottenPasswordMail: ({ origin, token }) => ({
    subject: 'Reset your password',
    text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n
  Please click on the following link, or paste it into your browser to complete the process:\n
  ${origin}/auth/reset-password/${token}\n
  If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  }),

  resetPasswordMail: ({ email }) => ({
    subject: 'Your password has been changed',
    text: `This is a confirmation that the password for your account ${email} has just been changed.\n`,
  }),

  activationMail: ({ origin, userId, token }) => ({
    subject: 'Activate your account',
    text: `Please click on the following link, or paste it into your browser to activate your account:\n
  ${origin}/auth/activate/${userId}/${token}\n`,
  }),
};
