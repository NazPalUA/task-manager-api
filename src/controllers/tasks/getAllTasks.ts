import { Request, Response } from 'express';
import prisma from '../../client';

const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

export { getAllTasks };
