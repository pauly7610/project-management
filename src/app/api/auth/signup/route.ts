import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signUpSchema } from "../../../../../packages/shared/src/types/user";
import { User } from "../../../../../packages/backend/models/User";
import { sendMail } from "../../../../../packages/backend/src/utils/mailer";

const JWT_SECRET = process.env.JWT_SECRET || "changeme_secret";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Validate input using shared Zod schema
    const parseResult = signUpSchema.safeParse(data);
    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ message: "Validation failed", errors: parseResult.error.errors }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const { name, email, password } = parseResult.data;

    // Check if user already exists in MongoDB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create a new user (using Mongoose model)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken
    });
    await newUser.save();

    // Send verification email
    const verifyUrl = `${process.env.BASE_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`;
    await sendMail({
      to: email,
      subject: "Verify your Motion Magic account",
      html: `<p>Click <a href='${verifyUrl}'>here</a> to verify your email.</p>`
    });

    // Issue JWT
    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: "7d" });

    // Set cookie (httpOnly, secure in production)
    return new Response(
      JSON.stringify({ message: "User created. Verification email sent.", token }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800${process.env.NODE_ENV === "production" ? "; Secure; SameSite=Strict" : ""}`
        }
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: "Internal server error", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}