"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromHeader = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Get secret from environment or use fallback
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const generateToken = (userId) => {
    const payload = { userId };
    const options = {
        // Cast the expiresIn to any to sidestep TypeScript errors
        expiresIn: JWT_EXPIRES_IN
    };
    try {
        // Try with a Buffer which is accepted by the typings
        const secretBuffer = Buffer.from(JWT_SECRET, 'utf-8');
        return jsonwebtoken_1.default.sign(payload, secretBuffer, options);
    }
    catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Failed to generate authentication token');
    }
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const secretBuffer = Buffer.from(JWT_SECRET, 'utf-8');
        return jsonwebtoken_1.default.verify(token, secretBuffer);
    }
    catch (error) {
        console.error('Error verifying token:', error);
        throw new Error('Invalid or expired token');
    }
};
exports.verifyToken = verifyToken;
const getTokenFromHeader = (authHeader) => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.split(' ')[1];
};
exports.getTokenFromHeader = getTokenFromHeader;
//# sourceMappingURL=jwt.js.map