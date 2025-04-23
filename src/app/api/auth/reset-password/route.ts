import bcrypt from "bcrypt";
import { User } from "../../../../../packages/backend/models/User";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();
    if (!token || !password) {
      return new Response(JSON.stringify({ message: "Token and new password required" }), { status: 400 });
    }
    const user = await User.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: new Date() } });
    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid or expired token" }), { status: 400 });
    }
    user.password = await bcrypt.hash(password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return new Response(JSON.stringify({ message: "Password reset successful" }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Internal server error", error: error.message }), { status: 500 });
  }
}
