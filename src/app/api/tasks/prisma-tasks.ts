import { prisma } from '../../../../packages/backend/src/prisma';

export async function createTask(data: any) {
  try {
    const task = await prisma.task.create({ data });
    return { status: 201, body: task };
  } catch (error: any) {
    return { status: 400, body: { message: error.message } };
  }
}

export async function getTasks() {
  try {
    const tasks = await prisma.task.findMany();
    return { status: 200, body: tasks };
  } catch (error: any) {
    return { status: 400, body: { message: error.message } };
  }
}

export async function updateTask(data: any) {
  try {
    const { id, ...rest } = data;
    const task = await prisma.task.update({ where: { id }, data: rest });
    return { status: 200, body: task };
  } catch (error: any) {
    return { status: 400, body: { message: error.message } };
  }
}

export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({ where: { id } });
    return { status: 200, body: { message: 'Task deleted' } };
  } catch (error: any) {
    return { status: 400, body: { message: error.message } };
  }
}
