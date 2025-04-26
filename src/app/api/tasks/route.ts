import { NextRequest } from 'next/server';
import { createTask, getTasks, updateTask, deleteTask } from './prisma-tasks';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { status, body } = await createTask(data);
  return new Response(JSON.stringify(body), { status });
}

export async function GET() {
  const { status, body } = await getTasks();
  return new Response(JSON.stringify(body), { status });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { status, body } = await updateTask(data);
  return new Response(JSON.stringify(body), { status });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const { status, body } = await deleteTask(id);
  return new Response(JSON.stringify(body), { status });
}
