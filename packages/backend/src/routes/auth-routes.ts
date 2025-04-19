import { Hono } from 'hono';
import type { Context } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { signUpSchema, signInSchema, passwordResetRequestSchema, passwordResetSchema } from '@motion-magic/shared';
import { authController } from '../controllers/auth-controller';
import type { Variables } from '../types';
import { z } from 'zod';

// Create router for auth endpoints
const authRouter = new Hono<{ Variables: Variables }>();

// Define email-only schema
const emailSchema = z.object({
  email: signInSchema.shape.email
});

// Register routes with validation
authRouter.post('/signup', zValidator('json', signUpSchema), (c: Context<{ Variables: Variables }>) => authController.signup(c));
authRouter.post('/signin', zValidator('json', signInSchema), (c: Context<{ Variables: Variables }>) => authController.signin(c));
authRouter.get('/verify', (c: Context<{ Variables: Variables }>) => authController.verifyEmail(c));
authRouter.post('/verify', zValidator('json', emailSchema), (c: Context<{ Variables: Variables }>) => authController.resendVerification(c));
authRouter.post('/reset-password', zValidator('json', passwordResetRequestSchema), (c: Context<{ Variables: Variables }>) => authController.requestPasswordReset(c));
authRouter.put('/reset-password', zValidator('json', passwordResetSchema), (c: Context<{ Variables: Variables }>) => authController.resetPassword(c));

export { authRouter }; 