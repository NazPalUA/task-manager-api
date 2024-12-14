import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../client';
import { asyncWrapper } from '../../middleware/async';
import { getTaskSchema } from '../../schemas/task.schema';

type GetTaskRequest = Request<z.infer<typeof getTaskSchema>['params']>;

const getTask_NoAsync = async (
  req: GetTaskRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const task = await prisma.task.findUnique({ where: { id } });

  if (!task) {
    res.status(404).json({ success: false, msg: `No task with id ${id}` });
    return;
  }

  res.status(200).json({ success: true, data: task });
};

const getTask = asyncWrapper(getTask_NoAsync);

export { getTask };
