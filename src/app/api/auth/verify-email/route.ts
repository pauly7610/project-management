import { User } from "../../../../../packages/backend/models/User";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    if (!token) {
      return new Response(JSON.stringify({ message: "Verification token is required" }), { status: 400 });
    }
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid or expired verification token" }), { status: 400 });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.emailVerified = new Date();
    await user.save();
    return new Response(JSON.stringify({ message: "Email verified successfully." }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Internal server error", error: error.message }), { status: 500 });
  }
}
