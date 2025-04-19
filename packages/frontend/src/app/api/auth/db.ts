// Mock database file for sharing data between API routes

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  createdAt: Date;
}

// Verification token type
export interface VerificationToken {
  email: string;
  expires: Date;
}

// Create mock databases
export const users = new Map<string, User>();
export const verificationTokens = new Map<string, VerificationToken>(); 