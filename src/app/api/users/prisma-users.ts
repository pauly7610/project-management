import { prisma } from '../../../../packages/backend/src/prisma';

export async function createUser(data: any) {
  try {
    const user = await prisma.user.create({ data });
    return { status: 201, body: user };
  } catch (error: any) {
    return { status: 400, body: { message: error.message } };
  }
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return { status: 200, body: users };
  } catch (error: any) {
    return { status: 400, body: { message: error.message } };
  }
}

export async function updateUser(data: any) {
  try {
    const { id, ...rest } = data;
    const user = await prisma.user.update({ where: { id }, data: rest });
    return { status: 200, body: user };
  } catch (error: any) {
    return { status: 400, body: { message: error.message } };
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({ where: { id } });
    return { status: 200, body: { message: 'User deleted' } };
  } catch (error: any) {
    return { status: 400, body: { message: error.message } };
  }
}
