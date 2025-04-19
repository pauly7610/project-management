"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
exports.getTokenFromHeader = getTokenFromHeader;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
function generateToken(userId, rememberMe = false) {
    return jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: rememberMe ? JWT_EXPIRES_LONG : JWT_EXPIRES_SHORT });
}
/**
 * Verify a JWT token
 * @param token The token to verify
 * @returns The decoded token payload
 */
function verifyToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        throw new Error('Invalid or expired token');
    }
}
/**
 * Extract a token from an Authorization header
 * @param authHeader The Authorization header value
 * @returns The token or null if not found
 */
function getTokenFromHeader(authHeader) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.split(' ')[1];
}
//# sourceMappingURL=jwt.js.map