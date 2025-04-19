import crypto from "crypto";

// Define types for the mock database
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
}

export interface VerificationToken {
  userId: string;
  token: string;
  createdAt: number;
}

// Mock database - this would normally be a database connection
export const mockDb: User[] = [];
export const mockVerificationTokens: VerificationToken[] = [];

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, password } = data;

    // Validate input
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Check if user already exists
    const userExists = mockDb.some((user) => user.email === email);
    if (userExists) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Mock password hashing
    const hashedPassword = password; // In a real app, you would hash the password

    // Create a new user
    const userId = crypto.randomBytes(16).toString("hex");
    const newUser: User = {
      id: userId,
      name,
      email,
      password: hashedPassword,
      isVerified: false
    };

    // Save user
    mockDb.push(newUser);

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    mockVerificationTokens.push({
      userId,
      token: verificationToken,
      createdAt: Date.now()
    });

    // In a real app, you would send an email with the verification link

    return new Response(
      JSON.stringify({ 
        message: "User registered successfully. Please verify your email.",
        userId 
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred during signup" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
} 