// POST /api/teams/invite - Invite team members
import { NextRequest } from "next/server";
import { inviteTeamMembers } from './prisma-invite-team';

export async function POST(req: NextRequest) {
  try {
    const { teamId, emails, invitedBy, role } = await req.json();
    if (!teamId || !emails || !invitedBy) {
      return new Response(JSON.stringify({ message: "teamId, emails, and invitedBy are required" }), { status: 400 });
    }
    // Use Prisma-based invite logic
    const { status, body } = await inviteTeamMembers({ teamId, emails, invitedBy, role });
    return new Response(JSON.stringify(body), { status });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Error inviting members", error: error.message }), { status: 500 });
  }
}
