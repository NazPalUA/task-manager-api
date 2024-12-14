import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../client';
import { updateTaskSchema } from '../../schemas/task.schema';
import { asyncWrapper } from '../../utils/asyncWrapper';

type UpdateTaskRequest = Request<
  z.infer<typeof updateTaskSchema>['params'],
  unknown,
  z.infer<typeof updateTaskSchema>['body']
>;

const updateTask_NoAsync = async (
  req: UpdateTaskRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const task = await prisma.task.update({
    where: { id },
    data: req.body,
  });
  res.status(200).json({ success: true, data: task });
};

const updateTask = asyncWrapper(updateTask_NoAsync);

export { updateTask };
