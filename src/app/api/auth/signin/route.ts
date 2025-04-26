import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signInSchema } from "../../../../../packages/shared/src/types/user";
import { signinUser } from './prisma-signin';

const JWT_SECRET = process.env.JWT_SECRET || "changeme_secret";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Use Prisma-based signin logic
    const { status, body } = await signinUser(data);
    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: "Error signing in", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
