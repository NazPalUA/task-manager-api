import { NextFunction, Request, Response } from 'express';
import prisma from '../../client';
import { asyncWrapper } from '../../middleware/async';

const getAllTasks_NoAsync = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const tasks = await prisma.task.findMany();
  res.status(200).json({ success: true, data: tasks });
};

const getAllTasks = asyncWrapper(getAllTasks_NoAsync);

export { getAllTasks };
