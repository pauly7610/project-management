import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Mock users database (in a real app, this would be a database)
const users = new Map([
  ["john@example.com", {
    id: "123",
    name: "John Doe",
    email: "john@example.com",
    password: crypto.createHash("sha256").update("password123").digest("hex"),
    isVerified: true
  }],
  ["jane@example.com", {
    id: "456",
    name: "Jane Smith",
    email: "jane@example.com",
    password: crypto.createHash("sha256").update("password456").digest("hex"),
    isVerified: true
  }]
]);

// Simulate comparing a password with its hash
const comparePasswords = (password: string, hashedPassword: string): boolean => {
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  return hash === hashedPassword;
};

// Simulate generating a session token
const generateSessionToken = (userId: string): string => {
  // Include the userId in the token generation process to make it unique per user
  return crypto.randomBytes(16).toString("hex") + userId.substring(0, 8);
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = users.get(email);

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if user's email is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { error: "Please verify your email before signing in" },
        { status: 403 }
      );
    }

    // Generate session token
    const sessionToken = generateSessionToken(user.id);

    // Create session expiration
    const expiresAt = rememberMe
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      : new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // In a real application, you would store the session in a database
    // and set an HTTP-only cookie with the session token

    // Create response with cookie
    const response = NextResponse.json(
      {
        message: "Authentication successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set({
      name: "session_token",
      value: sessionToken,
      expires: expiresAt,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 