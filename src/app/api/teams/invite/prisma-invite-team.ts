import { prisma } from '../../../../../packages/backend/src/prisma';
import { sendMail } from '../../../../../packages/backend/src/utils/mailer';

export async function inviteTeamMembers({ teamId, emails, invitedBy, role }: { teamId: string; emails: string; invitedBy: string; role?: string }) {
  // Find the project/team
  const team = await prisma.project.findUnique({ where: { id: teamId } });
  if (!team) {
    return { status: 404, body: { message: 'Team not found' } };
  }
  // Find the inviter
  const inviter = await prisma.user.findUnique({ where: { id: invitedBy } });
  if (!inviter) {
    return { status: 404, body: { message: 'Inviter not found' } };
  }
  const emailList = emails.split(/[\,\n]+/).map((e) => e.trim()).filter(Boolean);
  // For now, just send emails and return the list (no DB invite logic unless you have an Invite model)
  for (const email of emailList) {
    // Send invite email (customize as needed)
    await sendMail({
      to: email,
      subject: `You're invited to join ${team.name} on Motion Magic!`,
      html: `<p>${inviter.name} has invited you to join the team <b>${team.name}</b>.<br/>Click <a href='${process.env.NEXTAUTH_URL || "http://localhost:3000"}/accept-invite?teamId=${team.id}&email=${encodeURIComponent(email)}'>here</a> to accept your invite.</p>`
    });
  }
  return { status: 200, body: { message: 'Invites sent', invites: emailList } };
}
