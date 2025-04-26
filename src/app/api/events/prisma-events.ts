import { prisma } from '../../../../packages/backend/src/prisma';

export async function createEvent(data: any) {
  try {
    const event = await prisma.event.create({ data });
    return { status: 201, body: event };
  } catch (error: any) {
    return { status: 400, body: { message: error.message } };
  }
}

export async function getEvents() {
  try {
    const events = await prisma.event.findMany();
    return { status: 200, body: events };
  } catch (error: any) {
    return { status: 400, body: { message: error.message } };
  }
}

export async function updateEvent(data: any) {
  try {
    const { id, ...rest } = data;
    const event = await prisma.event.update({ where: { id }, data: rest });
    return { status: 200, body: event };
  } catch (error: any) {
    return { status: 400, body: { message: error.message } };
  }
}

export async function deleteEvent(id: string) {
  try {
    await prisma.event.delete({ where: { id } });
    return { status: 200, body: { message: 'Event deleted' } };
  } catch (error: any) {
    return { status: 400, body: { message: error.message } };
  }
}
