import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { signUpSchema, signInSchema, passwordResetRequestSchema, passwordResetSchema } from '@motion-magic/shared';
import { authController } from '../controllers/auth-controller';

// Create router for auth endpoints
const authRouter = new Hono();

// Register routes with validation
authRouter.post('/signup', zValidator('json', signUpSchema), authController.signup);
authRouter.post('/signin', zValidator('json', signInSchema), authController.signin);
authRouter.get('/verify', authController.verifyEmail);
authRouter.post('/verify', zValidator('json', { email: signInSchema.shape.email }), authController.resendVerification);
authRouter.post('/reset-password', zValidator('json', passwordResetRequestSchema), authController.requestPasswordReset);
authRouter.put('/reset-password', zValidator('json', passwordResetSchema), authController.resetPassword);

export { authRouter }; 