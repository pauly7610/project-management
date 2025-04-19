"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const shared_1 = require("@motion-magic/shared");
const auth_controller_1 = require("../controllers/auth-controller");
const zod_1 = require("zod");
// Create router for auth endpoints
const authRouter = new hono_1.Hono();
exports.authRouter = authRouter;
// Define email-only schema
const emailSchema = zod_1.z.object({
    email: shared_1.signInSchema.shape.email
});
// Register routes with validation
authRouter.post('/signup', (0, zod_validator_1.zValidator)('json', shared_1.signUpSchema), (c) => auth_controller_1.authController.signup(c));
authRouter.post('/signin', (0, zod_validator_1.zValidator)('json', shared_1.signInSchema), (c) => auth_controller_1.authController.signin(c));
authRouter.get('/verify', (c) => auth_controller_1.authController.verifyEmail(c));
authRouter.post('/verify', (0, zod_validator_1.zValidator)('json', emailSchema), (c) => auth_controller_1.authController.resendVerification(c));
authRouter.post('/reset-password', (0, zod_validator_1.zValidator)('json', shared_1.passwordResetRequestSchema), (c) => auth_controller_1.authController.requestPasswordReset(c));
authRouter.put('/reset-password', (0, zod_validator_1.zValidator)('json', shared_1.passwordResetSchema), (c) => auth_controller_1.authController.resetPassword(c));
//# sourceMappingURL=auth-routes.js.map