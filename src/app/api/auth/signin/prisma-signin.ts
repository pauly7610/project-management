import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../../../../packages/backend/src/prisma';
import { signInSchema } from '../../../../../packages/shared/src/types/user';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme_secret';

export async function signinUser(data: any) {
  // Validate input using shared Zod schema
  const parseResult = signInSchema.safeParse(data);
  if (!parseResult.success) {
    return {
      status: 400,
      body: { message: 'Validation failed', errors: parseResult.error.errors },
    };
  }
  const { email, password } = parseResult.data;

  // Find user in PostgreSQL
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return {
      status: 401,
      body: { message: 'Invalid email or password' },
    };
  }

  // Verify password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return {
      status: 401,
      body: { message: 'Invalid email or password' },
    };
  }

  // Issue JWT
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

  return {
    status: 200,
    body: {
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    },
  };
}
