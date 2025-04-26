import { PrismaClient } from '@prisma/client';

// Create a single Prisma client instance
export const prisma = new PrismaClient();

/**
 * Set the PostgreSQL session variable for RLS using JWT claims.
 * Must be called at the start of every request (after extracting user ID from JWT).
 * Usage: await setUserIdOnSession(userId)
 */
export async function setUserIdOnSession(userId: string) {
  // This sets the session variable for the current connection only
  await prisma.$executeRawUnsafe(`SET jwt.claims.user_id = '${userId.replace(/'/g, "''")}'`);
}
