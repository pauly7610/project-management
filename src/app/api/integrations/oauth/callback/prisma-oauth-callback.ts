import { prisma } from '../../../../../../packages/backend/src/prisma';

export async function oauthCallback({ provider, code, userId, redirectUri }: { provider: string; code: string; userId: string; redirectUri: string }) {
  if (!provider || !code || !userId || !redirectUri) {
    return { status: 400, body: { message: 'Missing required fields' } };
  }
  // Fetch user
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return { status: 404, body: { message: 'User not found' } };
  }
  let accessToken = code; // Default placeholder
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
      return { status: 400, body: { message: tokenData.error || 'Monday.com OAuth failed' } };
    }
    accessToken = tokenData.access_token;
  }
  // Save integration info (assuming a JSON field 'integrations' on User)
  const integrations = user.integrations || {};
  integrations[provider] = { accessToken };
  await prisma.user.update({
    where: { id: userId },
    data: { integrations },
  });
  return { status: 200, body: { message: `${provider} connected` } };
}
