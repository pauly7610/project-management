"use server";

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/user";
import { VerificationToken } from "@/models/verification-token";

// No longer need to redefine these maps since we're importing them
// const users = new Map();
// const verificationTokens = new Map();

export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Get token from the URL
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      );
    }

    // Find the token in our database
    const tokenDoc = await VerificationToken.findOne({ token });
    
    if (!tokenDoc) {
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 }
      );
    }
    
    // Check if token is expired
    if (tokenDoc.expires < new Date()) {
      await VerificationToken.deleteOne({ token });
      return NextResponse.json(
        { error: "Verification token has expired" },
        { status: 400 }
      );
    }

    const userEmail = tokenDoc.email;
    
    // Get the user
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Update user's verification status
    user.isVerified = true;
    await user.save();

    // Remove the verification token
    await VerificationToken.deleteOne({ token });

    // Redirect to login page with success message
    return NextResponse.redirect(
      new URL("/auth/signin?verified=true", request.url)
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "An error occurred during verification" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    const body = await request.json();
    const { email } = body;
    
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    if (user.isVerified) {
      return NextResponse.json(
        { message: "Email is already verified" },
        { status: 200 }
      );
    }
    
    // Generate a new verification token
    const token = crypto.randomBytes(32).toString("hex");
    
    await VerificationToken.create({
      token,
      email,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    });
    
    // In a real application, send a verification email
    console.log(`Verification link: http://localhost:3000/auth/verify?token=${token}`);
    
    return NextResponse.json(
      { message: "Verification email sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 