import { Prisma } from '.prisma/client';
import { Request, Response } from 'express';
import prisma from '../../client';

const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Prisma.TaskCreateInput = {
      name: req.body.name,
    };

    const task = await prisma.task.create({ data });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

export { createTask };
