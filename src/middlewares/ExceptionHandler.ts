import type { ErrorRequestHandler } from 'express';

export const ExceptionHandler: ErrorRequestHandler = (err, req, res) => {
  res.status(500).json({ message: 'Ocorreu um erro' });
};
