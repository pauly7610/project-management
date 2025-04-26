// GET /api/onboarding/status - Get onboarding progress for user/team
import { NextRequest } from "next/server";
import { getOnboardingStatus } from './prisma-status';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return new Response(JSON.stringify({ message: "userId is required" }), { status: 400 });
    }
    // Use Prisma-based function for onboarding status
    const { status, body } = await getOnboardingStatus(userId);
    return new Response(JSON.stringify(body), { status });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Error fetching onboarding status", error: error.message }), { status: 500 });
  }
}
