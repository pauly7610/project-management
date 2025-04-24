// POST /api/teams/invite - Invite team members
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { Team } from "../../../../../packages/backend/models/Team";
import { User } from "../../../../../packages/backend/models/User";
import { sendMail } from "../../../../../packages/backend/src/utils/mailer";

export async function POST(req: NextRequest) {
  try {
    const { teamId, emails, invitedBy, role } = await req.json();
    if (!teamId || !emails || !invitedBy) {
      return new Response(JSON.stringify({ message: "teamId, emails, and invitedBy are required" }), { status: 400 });
    }
    await mongoose.connect(process.env.MONGODB_URI || "");
    const team = await Team.findById(teamId);
    if (!team) {
      return new Response(JSON.stringify({ message: "Team not found" }), { status: 404 });
    }
    const inviter = await User.findById(invitedBy);
    if (!inviter) {
      return new Response(JSON.stringify({ message: "Inviter not found" }), { status: 404 });
    }
    const emailList = emails.split(/[,\n]+/).map((e: string) => e.trim()).filter(Boolean);
    for (const email of emailList) {
      team.invites.push({ email, role: role || "member", invitedBy: inviter._id, accepted: false });
      // Send invite email (customize as needed)
      await sendMail({
        to: email,
        subject: `You're invited to join ${team.name} on Motion Magic!`,
        html: `<p>${inviter.name} has invited you to join the team <b>${team.name}</b>.<br/>Click <a href='${process.env.NEXTAUTH_URL || "http://localhost:3000"}/accept-invite?teamId=${team._id}&email=${encodeURIComponent(email)}'>here</a> to accept your invite.</p>`
      });
    }
    await team.save();
    return new Response(JSON.stringify({ message: "Invites sent", invites: team.invites }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Error inviting members", error: error.message }), { status: 500 });
  }
}
