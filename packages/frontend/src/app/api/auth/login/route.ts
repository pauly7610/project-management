import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/user";
import { comparePassword, generateJWT } from "@/lib/auth-utils";

interface UserDocument {
  _id: any;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    const { email, password } = await request.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email }) as UserDocument;
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { error: "Please verify your email before logging in" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await generateJWT({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
} 