import crypto from "crypto";
import { User, VerificationToken, mockDb, mockVerificationTokens } from "../signup/route";

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

    // Find the verification record
    const verificationRecord = mockVerificationTokens.find(
      (record: VerificationToken) => record.token === token
    );

    if (!verificationRecord) {
      return new Response(
        JSON.stringify({ message: "Invalid verification token" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Check if token is expired (tokens valid for 24 hours)
    const tokenAge = Date.now() - verificationRecord.createdAt;
    if (tokenAge > 24 * 60 * 60 * 1000) {
      return new Response(
        JSON.stringify({ message: "Verification token has expired" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Find the user and update their verification status
    const userIndex = mockDb.findIndex(
      (user: User) => user.id === verificationRecord.userId
    );

    if (userIndex === -1) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Update user as verified
    mockDb[userIndex].isVerified = true;

    // Remove the verification token
    const tokenIndex = mockVerificationTokens.findIndex(
      (record: VerificationToken) => record.token === token
    );
    mockVerificationTokens.splice(tokenIndex, 1);

    return new Response(
      JSON.stringify({ message: "Email verification successful" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred during verification" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
} 