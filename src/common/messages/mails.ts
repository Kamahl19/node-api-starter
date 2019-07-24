export const forgottenPasswordMail = ({
  origin,
  passwordResetToken,
}: {
  origin: string;
  passwordResetToken: string;
}) => ({
  subject: 'Reset your password',
  text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n
Please click on the following link, or paste this into your browser to complete the process:\n
${origin}/auth/reset-password/${passwordResetToken}\n
If you did not request this, please ignore this email and your password will remain unchanged.\n`,
});

export const resetPasswordMail = ({ email }: { email: string }) => ({
  subject: 'Your password has been changed',
  text: `Hello,\n\nThis is a confirmation that the password for your account ${email} has just been changed.\n`,
});

export const activationMail = ({
  origin,
  userId,
  activationToken,
}: {
  origin: string;
  userId: string;
  activationToken: string;
}) => ({
  subject: 'Activate your account',
  text: `Please click on the following link, or paste this into your browser to activate your account:\n
${origin}/activate/${userId}/${activationToken}\n`,
});
