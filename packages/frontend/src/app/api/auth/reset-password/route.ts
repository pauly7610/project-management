"use server";

import { NextRequest, NextResponse } from "next/server";
import { generatePasswordResetToken, hashPassword } from "@/lib/auth-utils";
import { sendEmail, generateResetPasswordEmail } from "@/lib/email";

// Mock user database - replace with your database calls
const users: any[] = [];

// Mock password reset tokens - replace with your database calls
const passwordResetTokens: { identifier: string; token: string; expires: Date }[] = [];

// Mock findUserByEmail function - replace with your database implementation
async function findUserByEmail(email: string) {
  return users.find((user) => user.email === email) || null;
}

// Mock updateUser function - replace with your database implementation
async function updateUser(userId: string, data: any) {
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      ...data,
      updatedAt: new Date(),
    };
    return users[userIndex];
  }
  return null;
}

// Mock function to create a password reset token
async function createPasswordResetToken(email: string, token: string) {
  const resetToken = {
    identifier: email,
    token,
    expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
  };
  
  passwordResetTokens.push(resetToken);
  return resetToken;
}

// Mock function to find a password reset token
async function findPasswordResetToken(token: string, email: string) {
  return passwordResetTokens.find(
    (prt) => prt.token === token && prt.identifier === email
  ) || null;
}

// Mock function to delete a password reset token
async function deletePasswordResetToken(token: string, email: string) {
  const index = passwordResetTokens.findIndex(
    (prt) => prt.token === token && prt.identifier === email
  );
  if (index !== -1) {
    passwordResetTokens.splice(index, 1);
  }
}

// Route handler for requesting a password reset
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Find the user
    const user = await findUserByEmail(email);

    // Don't reveal if a user exists for security reasons
    if (!user) {
      return NextResponse.json(
        { message: "If your email is registered, you will receive a password reset link" },
        { status: 200 }
      );
    }

    // Generate a password reset token
    const resetToken = await generatePasswordResetToken(email);
    
    // Save the token in the database
    await createPasswordResetToken(email, resetToken);

    // Send the password reset email
    const emailHtml = generateResetPasswordEmail(resetToken, email);
    await sendEmail({
      to: email,
      subject: "Reset your Motion Magic password",
      html: emailHtml,
    });

    return NextResponse.json(
      { message: "If your email is registered, you will receive a password reset link" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Reset password request error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Route handler for resetting the password with a token
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, email, password } = body;

    if (!token || !email || !password) {
      return NextResponse.json(
        { error: "Token, email, and new password are required" },
        { status: 400 }
      );
    }

    // Find the password reset token
    const resetToken = await findPasswordResetToken(token, email);

    if (!resetToken) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    if (resetToken.expires < new Date()) {
      await deletePasswordResetToken(token, email);
      return NextResponse.json(
        { error: "Token has expired" },
        { status: 400 }
      );
    }

    // Find the user
    const user = await findUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password);

    // Update the user's password
    await updateUser(user.id, { password: hashedPassword });

    // Delete the password reset token
    await deletePasswordResetToken(token, email);

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
} 