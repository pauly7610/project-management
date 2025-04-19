import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getTokenFromHeader } from '../config/jwt';

// Extend Express Request type to include user information
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    const token = authHeader ? getTokenFromHeader(authHeader) : null;

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    // Verify token
    try {
      const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
      const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
      
      // Set user info to request object
      req.user = {
        userId: decoded.userId
      };
      
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}; 