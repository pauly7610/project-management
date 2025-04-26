import { NextRequest } from 'next/server';
import { createProject, getProjects, updateProject, deleteProject } from './prisma-projects';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { status, body } = await createProject(data);
  return new Response(JSON.stringify(body), { status });
}

export async function GET() {
  const { status, body } = await getProjects();
  return new Response(JSON.stringify(body), { status });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { status, body } = await updateProject(data);
  return new Response(JSON.stringify(body), { status });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const { status, body } = await deleteProject(id);
  return new Response(JSON.stringify(body), { status });
}
