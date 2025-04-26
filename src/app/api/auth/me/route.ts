import { cookies } from "next/headers";
import { getMe } from './prisma-me';

const JWT_SECRET = process.env.JWT_SECRET || "changeme_secret";

export async function GET() {
  try {
    const cookie = cookies().get("token");
    // Use Prisma-based user lookup
    const token = cookie?.value || '';
    const { status, body } = await getMe(token);
    return new Response(JSON.stringify(body), { status });
  } catch {
    return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
  }
}
