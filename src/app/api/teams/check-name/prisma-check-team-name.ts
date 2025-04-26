import { prisma } from '../../../../../packages/backend/src/prisma';

export async function checkTeamName(name: string) {
  // Check if a project/team with this name exists
  const exists = await prisma.project.findFirst({ where: { name } });
  return { status: 200, body: { exists: !!exists } };
}
