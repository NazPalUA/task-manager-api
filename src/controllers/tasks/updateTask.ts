import { Prisma } from '.prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import prisma from '../../client';

const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const where: Prisma.TaskWhereUniqueInput = { id };
    const data: Prisma.TaskUpdateInput = {
      ...req.body,
    };

    const task = await prisma.task.update({ where, data });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        res.status(404).json({ success: false, msg: `No task with id ${id}` });
        return;
      }
    }
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

export { updateTask };
