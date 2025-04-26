import crypto from "crypto";
import { forgotPassword } from './prisma-forgot-password';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    // Use Prisma-based forgot password logic
    const { status, body } = await forgotPassword(email);
    return new Response(JSON.stringify(body), { status });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Internal server error", error: error.message }), { status: 500 });
  }
}
