import { Request, Response } from 'express';
import { CreateTaskDTO, Task, UpdateTaskDTO } from '../types/task';
import { isValidTaskId } from '../utils/validation';
let tasks: Task[] = [];

const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

const createTask = async (
  req: Request<{}, {}, CreateTaskDTO>,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res
        .status(400)
        .json({ success: false, msg: 'Please provide valid name' });
      return;
    }

    const task: Task = {
      id: tasks.length + 1,
      name,
      completed: false,
      createdAt: new Date(),
    };

    tasks.push(task);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

const getTask = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!isValidTaskId(id)) {
      res.status(400).json({ success: false, msg: 'Invalid task id' });
      return;
    }

    const task = tasks.find(task => task.id === Number(id));

    if (!task) {
      res.status(404).json({ success: false, msg: `No task with id ${id}` });
      return;
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

const updateTask = async (
  req: Request<{ id: string }, {}, UpdateTaskDTO>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, completed } = req.body;

    const task = tasks.find(task => task.id === Number(id));

    if (!task) {
      res.status(404).json({ success: false, msg: `No task with id ${id}` });
      return;
    }

    if (name) task.name = name;
    if (completed !== undefined) task.completed = completed;

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!isValidTaskId(id)) {
      res.status(400).json({ success: false, msg: 'Invalid task id' });
      return;
    }

    const taskIndex = tasks.findIndex(task => task.id === Number(id));

    if (taskIndex === -1) {
      res.status(404).json({ success: false, msg: `No task with id ${id}` });
      return;
    }

    tasks.splice(taskIndex, 1);
    res.status(200).json({ success: true, msg: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

export { createTask, deleteTask, getAllTasks, getTask, updateTask };
