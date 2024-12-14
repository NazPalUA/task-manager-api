import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { CustomError } from '../errors/custom';

export const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      success: false,
      msg: err.message,
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      errors: err.errors.map(error => ({
        path: error.path,
        message: error.message,
      })),
    });
    return;
  }

  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2023':
        res.status(400).json({
          success: false,
          msg: 'Invalid ID format',
        });
        return;
      case 'P2025':
        const resource = (err.meta?.modelName as string) || 'Resource';
        res.status(404).json({
          success: false,
          msg: `${resource} not found`,
        });
        return;
    }
  }

  res.status(500).json({
    success: false,
    msg: err.message || 'Internal Server Error',
  });
};
