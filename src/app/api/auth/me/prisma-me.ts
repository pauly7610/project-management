import jwt from 'jsonwebtoken';
import { prisma } from '../../../../../packages/backend/src/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme_secret';

export async function getMe(token: string) {
  try {
    if (!token) {
      return { status: 401, body: { message: 'Not authenticated' } };
    }
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    if (!decoded.userId) {
      return { status: 401, body: { message: 'Invalid token' } };
    }
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      return { status: 401, body: { message: 'User not found' } };
    }
    return {
      status: 200,
      body: {
        authenticated: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
        }
      }
    };
  } catch {
    return { status: 401, body: { message: 'Not authenticated' } };
  }
}
