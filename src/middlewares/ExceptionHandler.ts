import type { ErrorRequestHandler } from 'express';
import { AppError } from '../common/AppError';

export const ExceptionHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({ message: error.message });
  }

  return res.status(500).json({ message: 'Ocorreu um erro' });
};
