import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme_secret";

export async function GET() {
  try {
    const cookie = cookies().get("token");
    if (!cookie) {
      return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
    }
    const token = cookie.value;
    const decoded = jwt.verify(token, JWT_SECRET);
    return new Response(JSON.stringify({ authenticated: true, user: decoded }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
  }
}
