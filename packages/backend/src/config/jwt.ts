import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { SignOptions } from 'jsonwebtoken';

dotenv.config();

// Get secret from environment or use fallback
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

interface TokenPayload {
  userId: string;
}

export const generateToken = (userId: string): string => {
  const payload: TokenPayload = { userId };
  const options: SignOptions = { 
    // Cast the expiresIn to any to sidestep TypeScript errors
    expiresIn: JWT_EXPIRES_IN as any 
  };
  
  try {
    // Try with a Buffer which is accepted by the typings
    const secretBuffer = Buffer.from(JWT_SECRET, 'utf-8');
    return jwt.sign(payload, secretBuffer, options);
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate authentication token');
  }
};

export const verifyToken = (token: string): jwt.JwtPayload | string => {
  try {
    const secretBuffer = Buffer.from(JWT_SECRET, 'utf-8');
    return jwt.verify(token, secretBuffer);
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Invalid or expired token');
  }
};

export const getTokenFromHeader = (authHeader: string): string | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.split(' ')[1];
}; 