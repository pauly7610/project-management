import jwt from 'jsonwebtoken';

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const JWT_EXPIRES_SHORT = process.env.JWT_EXPIRES_SHORT || '24h';
const JWT_EXPIRES_LONG = process.env.JWT_EXPIRES_LONG || '30d';

/**
 * Generate a JWT token for authentication
 * @param userId The user ID to include in the token
 * @param rememberMe Whether to use a longer expiration time
 * @returns The signed JWT token
 */
export function generateToken(userId: string, rememberMe = false): string {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: rememberMe ? JWT_EXPIRES_LONG : JWT_EXPIRES_SHORT }
  );
}

/**
 * Verify a JWT token
 * @param token The token to verify
 * @returns The decoded token payload
 */
export function verifyToken(token: string): jwt.JwtPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as jwt.JwtPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Extract a token from an Authorization header
 * @param authHeader The Authorization header value
 * @returns The token or null if not found
 */
export function getTokenFromHeader(authHeader: string): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.split(' ')[1];
} 