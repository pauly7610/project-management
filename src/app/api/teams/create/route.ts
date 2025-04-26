// POST /api/teams/create - Create a new team/org
import { NextRequest } from "next/server";
import { createTeam } from './prisma-create-team';

export async function POST(req: NextRequest) {
  try {
    const { name, description, ownerId } = await req.json();
    if (!name || !ownerId) {
      return new Response(JSON.stringify({ message: "Name and ownerId are required" }), { status: 400 });
    }
    // Use Prisma-based team creation
    const { status, body } = await createTeam({ name, description, ownerId });
    return new Response(JSON.stringify(body), { status });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Error creating team", error: error.message }), { status: 500 });
  }
}
