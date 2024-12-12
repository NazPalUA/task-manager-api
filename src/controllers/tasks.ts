import { Prisma } from '.prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import prisma from '../client';

const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

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

const getTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const where: Prisma.TaskWhereUniqueInput = { id };
    const task = await prisma.task.findUnique({ where });

    if (!task) {
      res.status(404).json({ success: false, msg: `No task with id ${id}` });
      return;
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2023') {
        res
          .status(400)
          .json({ success: false, msg: 'Invalid ObjectId format' });
        return;
      }
    }
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

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

const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const where: Prisma.TaskWhereUniqueInput = { id };
    await prisma.task.delete({ where });
    res.status(200).json({ success: true, msg: 'Task deleted successfully' });
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

export { createTask, deleteTask, getAllTasks, getTask, updateTask };
