import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../client';
import { CustomError } from '../../errors/custom';
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
    return next(new CustomError(`No task with id ${id}`, 404));
  }

  res.status(200).json({ success: true, data: task });
};

const getTask = asyncWrapper(getTask_NoAsync);

export { getTask };
