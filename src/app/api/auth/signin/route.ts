import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signInSchema } from "../../../../../packages/shared/src/types/user";
import { User } from "../../../../../packages/backend/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "changeme_secret";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Validate input using shared Zod schema
    const parseResult = signInSchema.safeParse(data);
    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ message: "Validation failed", errors: parseResult.error.errors }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const { email, password } = parseResult.data;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Verify password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Issue JWT
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    // Set cookie (httpOnly, secure in production)
    return new Response(
      JSON.stringify({ message: "Sign in successful", token }),
      {
        status: 200,
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
