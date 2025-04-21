"use server";

import crypto from "crypto";
import { SignJWT } from 'jose';

/**
 * Hashes a password using a secure one-way hash function
 */
export async function hashPassword(password: string): Promise<string> {
  // In a production app, you should use bcrypt, argon2, or similar
  // This is a simplified version for demonstration purposes
  return crypto.createHash("sha256").update(password).digest("hex");
}

/**
 * Compares a password with a hashed password
 */
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    // In a real application, use bcrypt.compare or similar
    // This is a simplified version for demo purposes
    const hash = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');
    
    return hash === hashedPassword;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
}

/**
 * Generates a password reset token
 */
export async function generatePasswordResetToken(): Promise<string> {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Generates a verification token for email verification
 */
export async function generateVerificationToken(): Promise<string> {
  return crypto.randomBytes(32).toString("hex");
}

// Secret key for JWT
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_key_for_development_only'
);

/**
 * Generates a JWT token (simplified version)
 */
export async function generateJWT(payload: Record<string, any>): Promise<string> {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(JWT_SECRET);
    
    return token;
  } catch (error) {
    console.error('Error generating JWT:', error);
    throw new Error('Failed to generate authentication token');
  }
}

/**
 * Verifies a JWT token
 */
export async function verifyJWT(token: string): Promise<any | null> {
  try {
    const [header, payload, signature] = token.split(".");
    
    const expectedSignature = crypto
      .createHmac("sha256", process.env.JWT_SECRET || "fallback_secret_key_for_development")
      .update(`${header}.${payload}`)
      .digest("base64");
    
    if (signature !== expectedSignature) {
      return null;
    }
    
    const decodedPayload = JSON.parse(Buffer.from(payload, "base64").toString());
    
    if (decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Token expired
    }
    
    return decodedPayload;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
} 