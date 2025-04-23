import crypto from "crypto";
import { User } from "../../../../../packages/backend/models/User";
import { sendMail } from "../../../../../packages/backend/src/utils/mailer";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return new Response(JSON.stringify({ message: "Email is required" }), { status: 400 });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "If that email exists, a reset link will be sent" }), { status: 200 });
    }
    const token = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = token;
    user.passwordResetExpires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
    await user.save();
    const resetUrl = `${process.env.BASE_URL || "http://localhost:3000"}/reset-password?token=${token}`;
    await sendMail({
      to: email,
      subject: "Reset your Motion Magic password",
      html: `<p>Click <a href='${resetUrl}'>here</a> to reset your password. This link expires in 1 hour.</p>`
    });
    return new Response(JSON.stringify({ message: "If that email exists, a reset link will be sent" }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Internal server error", error: error.message }), { status: 500 });
  }
}
