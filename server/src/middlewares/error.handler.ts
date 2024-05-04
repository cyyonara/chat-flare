import { Request, Response, NextFunction } from 'express';

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({ success: false, data: null, message: 'Resource not found' });
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
): void => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    data: null,
    message: err.message || 'Internal Server Error',
  });
};
