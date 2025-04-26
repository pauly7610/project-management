// POST /api/teams/check-name - Check if a team name is unique
import { NextRequest } from "next/server";
import { checkTeamName } from './prisma-check-team-name';

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  if (!name) {
    return new Response(JSON.stringify({ message: "Name is required" }), { status: 400 });
  }
  // Use Prisma-based team name check
  const { status, body } = await checkTeamName(name);
  return new Response(JSON.stringify(body), { status });
}
