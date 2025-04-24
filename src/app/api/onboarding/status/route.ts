// GET /api/onboarding/status - Get onboarding progress for user/team
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { Team } from "../../../../../packages/backend/models/Team";
import { User } from "../../../../../packages/backend/models/User";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return new Response(JSON.stringify({ message: "userId is required" }), { status: 400 });
    }
    await mongoose.connect(process.env.MONGODB_URI || "");
    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }
    const team = await Team.findOne({ "members.user": user._id });
    const hasTeam = !!team;
    const hasInvites = team && team.invites.some(inv => inv.email === user.email && !inv.accepted);
    const hasIntegrations = user.integrations && Object.keys(user.integrations).length > 0;
    const onboardingComplete = hasTeam && hasIntegrations;
    return new Response(
      JSON.stringify({
        onboardingComplete,
        hasTeam,
        hasInvites,
        hasIntegrations,
        team: team ? { id: team._id, name: team.name } : null
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Error fetching onboarding status", error: error.message }), { status: 500 });
  }
}
