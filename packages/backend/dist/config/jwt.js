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
        expiresIn: JWT_EXPIRES_IN
    };
    try {
        // Use type assertion to make TypeScript happy
        return jsonwebtoken_1.default.sign(payload, JWT_SECRET, options);
    }
    catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Failed to generate authentication token');
    }
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        // Use type assertion to make TypeScript happy
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
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