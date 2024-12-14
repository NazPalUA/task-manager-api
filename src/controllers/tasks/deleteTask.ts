import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../client';
import { asyncWrapper } from '../../middleware/async';
import { deleteTaskSchema } from '../../schemas/task.schema';

type DeleteTaskRequest = Request<z.infer<typeof deleteTaskSchema>['params']>;

const deleteTask_NoAsync = async (
  req: DeleteTaskRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  await prisma.task.delete({ where: { id } });
  res.status(200).json({ success: true, msg: 'Task deleted successfully' });
};

const deleteTask = asyncWrapper(deleteTask_NoAsync);

export { deleteTask };
