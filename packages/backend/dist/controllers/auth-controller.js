"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const authService = __importStar(require("../services/auth-service"));
const jwt_1 = require("../utils/jwt");
// Auth controller functions
exports.authController = {
    // User registration
    signup: async (c) => {
        try {
            const data = c.req.json();
            const result = await authService.registerUser(await data);
            return c.json({
                message: 'User created successfully. Please verify your email.',
                user: result.user
            }, 201 // Created
            );
        }
        catch (error) {
            console.error('Signup error:', error);
            if (error instanceof Error && error.message.includes('already exists')) {
                return c.json({ error: error.message }, 409); // Conflict
            }
            return c.json({ error: 'Internal server error' }, 500); // Internal Server Error
        }
    },
    // User login
    signin: async (c) => {
        try {
            const body = await c.req.json();
            const { email, password, rememberMe } = body;
            const user = await authService.authenticateUser(email, password);
            // Generate JWT token
            const token = (0, jwt_1.generateToken)(user.id, rememberMe);
            // Set cookie in the response
            const expires = rememberMe
                ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
                : new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
            c.header('Set-Cookie', `session_token=${token}; HttpOnly; Path=/; Expires=${expires.toUTCString()}; SameSite=Lax; ${process.env.NODE_ENV === 'production' ? 'Secure' : ''}`);
            return c.json({
                message: 'Authentication successful',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                }
            });
        }
        catch (error) {
            console.error('Signin error:', error);
            if (error instanceof Error) {
                if (error.message.includes('Invalid credentials')) {
                    return c.json({ error: 'Invalid credentials' }, 401); // Unauthorized
                }
                if (error.message.includes('verify your email')) {
                    return c.json({ error: error.message }, 403); // Forbidden
                }
            }
            return c.json({ error: 'Internal server error' }, 500); // Internal Server Error
        }
    },
    // Email verification
    verifyEmail: async (c) => {
        try {
            const token = c.req.query('token');
            if (!token) {
                return c.json({ error: 'Verification token is required' }, 400); // Bad Request
            }
            await authService.verifyEmail(token);
            // Redirect to verification success page
            return c.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verification-success`);
        }
        catch (error) {
            console.error('Verification error:', error);
            if (error instanceof Error) {
                return c.json({ error: error.message }, 400); // Bad Request
            }
            return c.json({ error: 'Internal server error' }, 500); // Internal Server Error
        }
    },
    // Resend verification email
    resendVerification: async (c) => {
        try {
            const body = await c.req.json();
            const { email } = body;
            await authService.resendVerificationEmail(email);
            return c.json({ message: 'Verification email sent' });
        }
        catch (error) {
            console.error('Resend verification error:', error);
            if (error instanceof Error) {
                if (error.message.includes('not found')) {
                    return c.json({ error: 'User not found' }, 404); // Not Found
                }
                if (error.message.includes('already verified')) {
                    return c.json({ message: 'Email is already verified' });
                }
            }
            return c.json({ error: 'Internal server error' }, 500); // Internal Server Error
        }
    },
    // Request password reset
    requestPasswordReset: async (c) => {
        try {
            const body = await c.req.json();
            const { email } = body;
            await authService.requestPasswordReset(email);
            // Don't reveal if a user exists for security reasons
            return c.json({
                message: 'If your email is registered, you will receive a password reset link'
            });
        }
        catch (error) {
            console.error('Password reset request error:', error);
            return c.json({ error: 'Internal server error' }, 500); // Internal Server Error
        }
    },
    // Reset password with token
    resetPassword: async (c) => {
        try {
            const body = await c.req.json();
            const data = body;
            await authService.resetPassword(data.token, data.email, data.password);
            return c.json({ message: 'Password reset successful' });
        }
        catch (error) {
            console.error('Reset password error:', error);
            if (error instanceof Error) {
                if (error.message.includes('invalid') || error.message.includes('expired')) {
                    return c.json({ error: error.message }, 400); // Bad Request
                }
                if (error.message.includes('not found')) {
                    return c.json({ error: 'User not found' }, 404); // Not Found
                }
            }
            return c.json({ error: 'Internal server error' }, 500); // Internal Server Error
        }
    }
};
//# sourceMappingURL=auth-controller.js.map