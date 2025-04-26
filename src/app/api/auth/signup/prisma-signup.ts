import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { prisma } from '../../../../../packages/backend/src/prisma';
import { sendMail } from '../../../../../packages/backend/src/utils/mailer';
import { signUpSchema } from '../../../../../packages/shared/src/types/user';

export async function signupUser(data: any) {
  // Validate input using shared Zod schema
  const parseResult = signUpSchema.safeParse(data);
  if (!parseResult.success) {
    return {
      status: 400,
      body: { message: 'Validation failed', errors: parseResult.error.errors },
    };
  }
  const { name, email, password } = parseResult.data;

  // Check if user already exists in PostgreSQL
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return {
      status: 400,
      body: { message: 'User already exists' },
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate verification token
  const verificationToken = crypto.randomBytes(32).toString('hex');

  // Create user in PostgreSQL
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
    },
  });

  // Send verification email
  await sendMail({
    to: email,
    subject: 'Verify your email for Motion Magic',
    html: `<p>Hi ${name},<br/>Please verify your email by clicking <a href='${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/auth/verify?token=${verificationToken}'>here</a>.</p>`
  });

  return {
    status: 201,
    body: { message: 'User created successfully. Please verify your email.', userId: user.id },
  };
}
