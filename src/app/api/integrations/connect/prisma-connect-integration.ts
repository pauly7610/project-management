import { prisma } from '../../../../../packages/backend/src/prisma';

export async function connectIntegration({ userId, provider, accessToken }: { userId: string; provider: string; accessToken: string }) {
  if (!userId || !provider || !accessToken) {
    return { status: 400, body: { message: 'userId, provider, and accessToken are required' } };
  }
  // Fetch user
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return { status: 404, body: { message: 'User not found' } };
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
