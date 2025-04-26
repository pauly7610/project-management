import { NextRequest } from 'next/server';
import { createEvent, getEvents, updateEvent, deleteEvent } from './prisma-events';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { status, body } = await createEvent(data);
  return new Response(JSON.stringify(body), { status });
}

export async function GET() {
  const { status, body } = await getEvents();
  return new Response(JSON.stringify(body), { status });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { status, body } = await updateEvent(data);
  return new Response(JSON.stringify(body), { status });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const { status, body } = await deleteEvent(id);
  return new Response(JSON.stringify(body), { status });
}
