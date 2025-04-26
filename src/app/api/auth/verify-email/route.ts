import { verifyUser } from '../verify/prisma-verify';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    // Use Prisma-based verification logic
    const { status, body } = await verifyUser(token || '');
    return new Response(JSON.stringify(body), { status });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Internal server error", error: error.message }), { status: 500 });
  }
}
