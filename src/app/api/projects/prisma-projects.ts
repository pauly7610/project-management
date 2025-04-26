import { prisma } from '../../../../packages/backend/src/prisma';

export async function createProject(data: any) {
  try {
    const project = await prisma.project.create({ data });
    return { status: 201, body: project };
  } catch (error: any) {
    return { status: 400, body: { message: error.message } };
  }
}

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany();
    return { status: 200, body: projects };
  } catch (error: any) {
    return { status: 400, body: { message: error.message } };
  }
}

export async function updateProject(data: any) {
  try {
    const { id, ...rest } = data;
    const project = await prisma.project.update({ where: { id }, data: rest });
    return { status: 200, body: project };
  } catch (error: any) {
    return { status: 400, body: { message: error.message } };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({ where: { id } });
    return { status: 200, body: { message: 'Project deleted' } };
  } catch (error: any) {
    return { status: 400, body: { message: error.message } };
  }
}
