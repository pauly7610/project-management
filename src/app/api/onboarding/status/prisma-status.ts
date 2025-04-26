import { prisma } from '../../../../../packages/backend/src/prisma';

export async function getOnboardingStatus(userId: string) {
  // Fetch the user by ID
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      settings: true,
      projectsOwned: true,
      projectsTeam: true,
      tasksAssigned: true,
      tasksCreated: true,
      eventsOrganized: true,
      eventsAttending: true,
    },
  });

  if (!user) {
    return { status: 404, body: { message: 'User not found' } };
  }

  // Check for team membership (projectsTeam is an array of Project, team is not normalized in Prisma schema)
  const hasTeam = user.projectsTeam && user.projectsTeam.length > 0;

  // Check for invites (assuming you have an Invite model/table, otherwise set to false)
  // For now, we assume no invites
  const hasInvites = false;

  // Check for integrations (assuming integrations is a JSON field or similar)
  // If not present, set to false
  const hasIntegrations = (user as any).integrations && Object.keys((user as any).integrations).length > 0;

  // Onboarding is complete if user has a team and integrations
  const onboardingComplete = hasTeam && hasIntegrations;

  // Return the team info if present (using the first team project as a proxy)
  const team = hasTeam ? { id: user.projectsTeam[0].id, name: user.projectsTeam[0].name } : null;

  return {
    status: 200,
    body: {
      onboardingComplete,
      hasTeam,
      hasInvites,
      hasIntegrations,
      team,
    },
  };
}
