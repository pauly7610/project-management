import { prisma } from '../../../../../packages/backend/src/prisma';

export async function verifyUser(token: string) {
  if (!token) {
    return {
      status: 400,
      body: { message: 'Verification token is required' },
    };
  }
  // Find user by verification token
  const user = await prisma.user.findFirst({ where: { verificationToken: token } });
  if (!user) {
    return {
      status: 400,
      body: { message: 'Invalid or expired verification token' },
    };
  }
  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verificationToken: null,
      emailVerified: new Date(),
    },
  });
  return {
    status: 200,
    body: { message: 'Email verified successfully.' },
  };
}
