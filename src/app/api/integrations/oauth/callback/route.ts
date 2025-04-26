// POST /api/integrations/oauth/callback - Handle OAuth callback for a tool
import { NextRequest } from "next/server";
import { oauthCallback } from './prisma-oauth-callback';

export async function POST(req: NextRequest) {
  const { provider, code, userId, redirectUri } = await req.json();
  if (!provider || !code || !userId || !redirectUri) {
    return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
  }
  // Use Prisma-based OAuth callback logic
  const { status, body } = await oauthCallback({ provider, code, userId, redirectUri });
  return new Response(JSON.stringify(body), { status });
}
