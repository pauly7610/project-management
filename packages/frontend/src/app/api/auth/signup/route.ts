"use server";

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/user";
import { VerificationToken } from "@/models/verification-token";

// Simulate hashing a password (this should be replaced with bcrypt in production)
const hashPassword = (password: string): string => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

// Create a verification token
const createVerificationToken = async (email: string): Promise<string> => {
  const token = crypto.randomBytes(32).toString("hex");
  
  // Store token with 24 hour expiration
  await VerificationToken.create({
    token,
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
    // Connect to the database
    await connectToDatabase();
    
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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = hashPassword(password);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    // Create verification token
    const verificationToken = await createVerificationToken(email);

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    // Return success response (without exposing the password)
    return NextResponse.json(
      { 
        message: "User created successfully. Please verify your email.", 
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          isVerified: newUser.isVerified,
        }
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