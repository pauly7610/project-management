// POST /api/integrations/connect - Connect a tool (e.g., GitHub)
import { NextRequest } from "next/server";
import { connectIntegration } from './prisma-connect-integration';

export async function POST(req: NextRequest) {
  try {
    const { userId, provider, accessToken } = await req.json();
    if (!userId || !provider || !accessToken) {
      return new Response(JSON.stringify({ message: "userId, provider, and accessToken are required" }), { status: 400 });
    }
    // Use Prisma-based integration connect logic
    const { status, body } = await connectIntegration({ userId, provider, accessToken });
    return new Response(JSON.stringify(body), { status });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Error connecting integration", error: error.message }), { status: 500 });
  }
}
