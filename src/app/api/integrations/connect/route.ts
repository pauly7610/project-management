// POST /api/integrations/connect - Connect a tool (e.g., GitHub)
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { User } from "../../../../../packages/backend/models/User";

export async function POST(req: NextRequest) {
  try {
    const { userId, provider, accessToken } = await req.json();
    if (!userId || !provider || !accessToken) {
      return new Response(JSON.stringify({ message: "userId, provider, and accessToken are required" }), { status: 400 });
    }
    await mongoose.connect(process.env.MONGODB_URI || "");
    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }
    // Save integration info to user (extend User model as needed)
    user.integrations = user.integrations || {};
    user.integrations[provider] = { accessToken };
    await user.save();
    return new Response(JSON.stringify({ message: `${provider} connected` }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Error connecting integration", error: error.message }), { status: 500 });
  }
}
