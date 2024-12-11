import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../types/error';

export const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = (err as CustomError).status || 500;
  res.status(statusCode).json({
    success: false,
    msg: err.message || 'Internal Server Error',
  });
};
