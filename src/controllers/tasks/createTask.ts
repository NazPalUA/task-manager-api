import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../client';
import { createTaskSchema } from '../../schemas/task.schema';

type CreateTaskRequest = Request<
  unknown,
  unknown,
  z.infer<typeof createTaskSchema>['body']
>;

const createTask = async (
  req: CreateTaskRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.body;

    const task = await prisma.task.create({
      data: { name },
    });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export { createTask };
