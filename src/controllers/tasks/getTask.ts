import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../client';
import { getTaskSchema } from '../../schemas/task.schema';

type GetTaskRequest = Request<z.infer<typeof getTaskSchema>['params']>;

const getTask = async (
  req: GetTaskRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      res.status(404).json({ success: false, msg: `No task with id ${id}` });
      return;
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export { getTask };
