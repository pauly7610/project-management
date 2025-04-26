import { prisma } from '../../../../../packages/backend/src/prisma';

export async function createTeam({ name, description, ownerId }: { name: string; description?: string; ownerId: string }) {
  // Ensure owner exists
  const owner = await prisma.user.findUnique({ where: { id: ownerId } });
  if (!owner) {
    return { status: 404, body: { message: 'Owner not found' } };
  }

  // Create the team as a Project with owner and team membership (adjust as needed for your schema)
  const teamProject = await prisma.project.create({
    data: {
      name,
      description: description || '',
      status: 'active',
      owner: { connect: { id: ownerId } },
      team: { connect: [{ id: ownerId }] },
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Default 1 year
      priority: 'normal',
      progress: 0
    },
    include: {
      owner: true,
      team: true
    }
  });

  return { status: 201, body: { team: teamProject } };
}
