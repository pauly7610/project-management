// POST /api/integrations/oauth/callback - Handle OAuth callback for a tool
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { User } from "../../../../../../packages/backend/models/User";

export async function POST(req: NextRequest) {
  const { provider, code, userId, redirectUri } = await req.json();
  if (!provider || !code || !userId || !redirectUri) {
    return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
  }
  await mongoose.connect(process.env.MONGODB_URI || "");
  const user = await User.findById(userId);
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
  }
  user.integrations = user.integrations || {};

  // --- Real token exchange for Monday.com ---
  if (provider === 'monday') {
    const tokenRes = await fetch('https://auth.monday.com/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.MONDAY_CLIENT_ID!,
        client_secret: process.env.MONDAY_CLIENT_SECRET!,
        code,
        redirect_uri: redirectUri,
      }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return new Response(JSON.stringify({ message: tokenData.error || 'Monday.com OAuth failed' }), { status: 400 });
    }
    user.integrations[provider] = { accessToken: tokenData.access_token };
    await user.save();
    return new Response(JSON.stringify({ message: `monday connected` }), { status: 200 });
  }

  // --- Placeholder for other providers ---
  user.integrations[provider] = { accessToken: code }; // Replace with real token exchange!
  await user.save();
  return new Response(JSON.stringify({ message: `${provider} connected` }), { status: 200 });
}
