"use server";

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { users, verificationTokens } from "../signup/route";

// No longer need to redefine these maps since we're importing them
// const users = new Map();
// const verificationTokens = new Map();

export async function GET(request: NextRequest) {
  try {
    // Get token from the URL
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      );
    }

    // Find the token in our verificationTokens map
    let userEmail = null;
    
    // Convert map entries to array to avoid TypeScript iteration error
    for (const [email, storedToken] of Array.from(verificationTokens.entries())) {
      if (storedToken === token) {
        userEmail = email;
        break;
      }
    }

    if (!userEmail) {
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 }
      );
    }

    // Get the user
    const user = users.get(userEmail);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Update user's verification status
    user.isVerified = true;
    users.set(userEmail, user);

    // Remove the verification token
    verificationTokens.delete(userEmail);

    // Redirect to login page with success message
    return NextResponse.redirect(
      new URL("/login?verified=true", request.url)
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
    const body = await request.json();
    const { email } = body;
    
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    
    const user = users.get(email);
    
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
    verificationTokens.set(token, email);
    
    // In a real application, send a verification email
    // sendVerificationEmail(email, token);
    
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