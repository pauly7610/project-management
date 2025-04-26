import crypto from 'crypto';
import { prisma } from '../../../../../packages/backend/src/prisma';
import { sendMail } from '../../../../../packages/backend/src/utils/mailer';

export async function forgotPassword(email: string) {
  if (!email) {
    return { status: 400, body: { message: 'Email is required' } };
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // Always return success for security
    return { status: 200, body: { message: 'If that email exists, a reset link will be sent' } };
  }
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
  await prisma.user.update({
    where: { email },
    data: {
      passwordResetToken: token,
      passwordResetExpires: expires,
    },
  });
  const resetUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
  await sendMail({
    to: email,
    subject: 'Reset your Motion Magic password',
    html: `<p>Click <a href='${resetUrl}'>here</a> to reset your password. This link expires in 1 hour.</p>`,
  });
  return { status: 200, body: { message: 'If that email exists, a reset link will be sent' } };
}
