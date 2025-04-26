import { NextRequest } from 'next/server';
import { createUser, getUsers, updateUser, deleteUser } from './prisma-users';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { status, body } = await createUser(data);
  return new Response(JSON.stringify(body), { status });
}

export async function GET() {
  const { status, body } = await getUsers();
  return new Response(JSON.stringify(body), { status });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { status, body } = await updateUser(data);
  return new Response(JSON.stringify(body), { status });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const { status, body } = await deleteUser(id);
  return new Response(JSON.stringify(body), { status });
}
