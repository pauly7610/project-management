"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
const protect = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        const token = authHeader ? (0, jwt_1.getTokenFromHeader)(authHeader) : null;
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token provided' });
        }
        // Verify token
        try {
            const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            // Set user info to request object
            req.user = {
                userId: decoded.userId
            };
            next();
        }
        catch (error) {
            console.error('Token verification failed:', error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.middleware.js.map