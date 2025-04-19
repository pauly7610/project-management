"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
/**
 * Authentication middleware to protect routes
 * Sets the userId in the Hono context if authentication is successful
 */
const authenticate = async (c, next) => {
    try {
        // Get authorization header
        const authHeader = c.req.header('Authorization');
        if (!authHeader) {
            return c.json({ message: 'Not authorized, no token provided' }, 401);
        }
        // Extract token
        const token = (0, jwt_1.getTokenFromHeader)(authHeader);
        if (!token) {
            return c.json({ message: 'Not authorized, invalid token format' }, 401);
        }
        // Verify token
        try {
            const decoded = (0, jwt_1.verifyToken)(token);
            // Set user ID in the context
            c.set('userId', decoded.userId);
            // Continue to the next middleware/handler
            await next();
        }
        catch (error) {
            return c.json({ message: 'Not authorized, token verification failed' }, 401);
        }
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        return c.json({ message: 'Server error' }, 500);
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth-middleware.js.map