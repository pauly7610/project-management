import crypto from "crypto";
import { verifyUser } from './prisma-verify';

export async function GET(request: Request) {
  try {
    // Get the token from the URL
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    // Use Prisma-based verification logic
    const { status, body } = await verifyUser(token || '');
    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: "Internal server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}