"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const shared_1 = require("@motion-magic/shared");
const auth_controller_1 = require("../controllers/auth-controller");
// Create router for auth endpoints
const authRouter = new hono_1.Hono();
exports.authRouter = authRouter;
// Register routes with validation
authRouter.post('/signup', (0, zod_validator_1.zValidator)('json', shared_1.signUpSchema), auth_controller_1.authController.signup);
authRouter.post('/signin', (0, zod_validator_1.zValidator)('json', shared_1.signInSchema), auth_controller_1.authController.signin);
authRouter.get('/verify', auth_controller_1.authController.verifyEmail);
authRouter.post('/verify', (0, zod_validator_1.zValidator)('json', { email: shared_1.signInSchema.shape.email }), auth_controller_1.authController.resendVerification);
authRouter.post('/reset-password', (0, zod_validator_1.zValidator)('json', shared_1.passwordResetRequestSchema), auth_controller_1.authController.requestPasswordReset);
authRouter.put('/reset-password', (0, zod_validator_1.zValidator)('json', shared_1.passwordResetSchema), auth_controller_1.authController.resetPassword);
//# sourceMappingURL=auth-routes.js.map