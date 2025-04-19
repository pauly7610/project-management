"use server";

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Export mock database for use in other API routes
export const users = new Map();
export const verificationTokens = new Map();

// Simulate hashing a password
const hashPassword = (password: string): string => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

// Simulate creating a verification token
const createVerificationToken = (email: string): string => {
  const token = crypto.randomBytes(32).toString("hex");
  // Store token with 24 hour expiration
  verificationTokens.set(token, {
    email,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
  return token;
};

// Simulate sending a verification email
const sendVerificationEmail = async (email: string, token: string) => {
  console.log(`Sending verification email to ${email}`);
  console.log(`Verification link: http://localhost:3000/auth/verify?token=${token}&email=${encodeURIComponent(email)}`);
  // In a real app, you would use a service like SendGrid, Mailgun, etc.
  return true;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (users.has(email)) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = hashPassword(password);

    // Create user
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      createdAt: new Date(),
    };

    // Store user
    users.set(email, newUser);

    // Create verification token
    const verificationToken = createVerificationToken(email);

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    // Return success response (without exposing the password)
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json(
      { 
        message: "User created successfully. Please verify your email.", 
        user: userWithoutPassword 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 