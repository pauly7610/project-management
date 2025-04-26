import { resetPassword } from './prisma-reset-password';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();
    // Use Prisma-based reset password logic
    const { status, body } = await resetPassword(token, password);
    return new Response(JSON.stringify(body), { status });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Internal server error", error: error.message }), { status: 500 });
  }
}
