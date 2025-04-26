import crypto from "crypto";
import jwt from "jsonwebtoken";
import { signUpSchema } from "../../../../../packages/shared/src/types/user";
import { sendMail } from "../../../../../packages/backend/src/utils/mailer";
import { signupUser } from './prisma-signup';

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
    const { status, body } = await signupUser(data);
    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: "Error signing up", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}