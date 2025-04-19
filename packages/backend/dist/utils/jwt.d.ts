import jwt from 'jsonwebtoken';
/**
 * Generate a JWT token for authentication
 * @param userId The user ID to include in the token
 * @param rememberMe Whether to use a longer expiration time
 * @returns The signed JWT token
 */
export declare function generateToken(userId: string, rememberMe?: boolean): string;
/**
 * Verify a JWT token
 * @param token The token to verify
 * @returns The decoded token payload
 */
export declare function verifyToken(token: string): jwt.JwtPayload;
/**
 * Extract a token from an Authorization header
 * @param authHeader The Authorization header value
 * @returns The token or null if not found
 */
export declare function getTokenFromHeader(authHeader: string): string | null;
