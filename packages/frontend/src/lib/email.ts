"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailProps) {
  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM is not defined");
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

export async function generateVerificationEmail(token: string, userEmail: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const verificationUrl = `${baseUrl}/auth/verify?token=${token}&email=${encodeURIComponent(
    userEmail
  )}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; padding: 20px 0;">
        <h1 style="color: #1a56db;">Motion Magic</h1>
      </div>
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
        <h2 style="color: #111827;">Verify your email address</h2>
        <p style="color: #374151; margin-bottom: 24px;">
          Thanks for signing up for Motion Magic! Please verify your email address by clicking the button below.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #1a56db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Verify Email
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">
          If you didn't create an account with Motion Magic, you can safely ignore this email.
        </p>
        <p style="color: #6b7280; font-size: 14px;">
          If the button doesn't work, copy and paste this URL into your browser:
          <br>
          <a href="${verificationUrl}" style="color: #1a56db; word-break: break-all;">
            ${verificationUrl}
          </a>
        </p>
      </div>
      <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 14px;">
        &copy; ${new Date().getFullYear()} Motion Magic. All rights reserved.
      </div>
    </div>
  `;

  return html;
}

export async function generateResetPasswordEmail(token: string, userEmail: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const resetUrl = `${baseUrl}/auth/reset-password?token=${token}&email=${encodeURIComponent(
    userEmail
  )}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; padding: 20px 0;">
        <h1 style="color: #1a56db;">Motion Magic</h1>
      </div>
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
        <h2 style="color: #111827;">Reset your password</h2>
        <p style="color: #374151; margin-bottom: 24px;">
          You requested to reset your password. Click the button below to set a new password.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #1a56db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Reset Password
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">
          If you didn't request a password reset, you can safely ignore this email.
        </p>
        <p style="color: #6b7280; font-size: 14px;">
          If the button doesn't work, copy and paste this URL into your browser:
          <br>
          <a href="${resetUrl}" style="color: #1a56db; word-break: break-all;">
            ${resetUrl}
          </a>
        </p>
      </div>
      <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 14px;">
        &copy; ${new Date().getFullYear()} Motion Magic. All rights reserved.
      </div>
    </div>
  `;

  return html;
} 