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
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res
        .status(400)
        .json({ success: false, msg: 'Please provide a valid name' });
      return;
    }

    const task = await prisma.task.create({
      data: {
        name,
      },
    });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

const getTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });

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
    const { name, completed } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: {
        name,
        completed,
      },
    });

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
    await prisma.task.delete({
      where: { id },
    });

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
