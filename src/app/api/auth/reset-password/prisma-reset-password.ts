import bcrypt from 'bcrypt';
import { prisma } from '../../../../../packages/backend/src/prisma';

export async function resetPassword(token: string, password: string) {
  if (!token || !password) {
    return { status: 400, body: { message: 'Token and new password required' } };
  }
  // Find user with valid token and not expired
  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: token,
      passwordResetExpires: { gt: new Date() },
    },
  });
  if (!user) {
    return { status: 400, body: { message: 'Invalid or expired token' } };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
    },
  });
  return { status: 200, body: { message: 'Password reset successful' } };
}
