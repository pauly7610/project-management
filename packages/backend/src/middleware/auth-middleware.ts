import { Context, MiddlewareHandler, Next } from 'hono';
import { verifyToken, getTokenFromHeader } from '../utils/jwt';

/**
 * Authentication middleware to protect routes
 * Sets the userId in the Hono context if authentication is successful
 */
export const authenticate: MiddlewareHandler = async (c: Context, next: Next) => {
  try {
    // Get authorization header
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader) {
      return c.json({ message: 'Not authorized, no token provided' }, 401);
    }
    
    // Extract token
    const token = getTokenFromHeader(authHeader);
    
    if (!token) {
      return c.json({ message: 'Not authorized, invalid token format' }, 401);
    }
    
    // Verify token
    try {
      const decoded = verifyToken(token);
      
      // Set user ID in the context
      c.set('userId', decoded.userId as string);
      
      // Continue to the next middleware/handler
      await next();
    } catch (error) {
      return c.json({ message: 'Not authorized, token verification failed' }, 401);
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return c.json({ message: 'Server error' }, 500);
  }
}; 