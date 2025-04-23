import crypto from "crypto";
import { User } from "../../../../../packages/backend/models/User";
import { Types } from "mongoose";

export async function GET(request: Request) {
  try {
    // Get the token from the URL
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response(
        JSON.stringify({ message: "Verification token is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Find the user with the verification token (assume token is stored in user for now)
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid or expired verification token" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.emailVerified = new Date();
    await user.save();

    return new Response(
      JSON.stringify({ message: "Email verified successfully." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: "Internal server error", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}