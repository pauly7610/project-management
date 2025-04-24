// POST /api/teams/check-name - Check if a team name is unique
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { Team } from "../../../../../packages/backend/models/Team";

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  if (!name) {
    return new Response(JSON.stringify({ message: "Name is required" }), { status: 400 });
  }
  await mongoose.connect(process.env.MONGODB_URI || "");
  const exists = await Team.exists({ name });
  return new Response(JSON.stringify({ exists }), { status: 200 });
}
