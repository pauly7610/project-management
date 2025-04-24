// POST /api/teams/create - Create a new team/org
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { Team } from "../../../../../packages/backend/models/Team";
import { User } from "../../../../../packages/backend/models/User";

export async function POST(req: NextRequest) {
  try {
    const { name, description, ownerId } = await req.json();
    if (!name || !ownerId) {
      return new Response(JSON.stringify({ message: "Name and ownerId are required" }), { status: 400 });
    }
    await mongoose.connect(process.env.MONGODB_URI || "");
    const owner = await User.findById(ownerId);
    if (!owner) {
      return new Response(JSON.stringify({ message: "Owner not found" }), { status: 404 });
    }
    const team = new Team({
      name,
      description,
      owner: owner._id,
      members: [{ user: owner._id, role: "owner" }],
      invites: []
    });
    await team.save();
    return new Response(JSON.stringify({ team }), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Error creating team", error: error.message }), { status: 500 });
  }
}
