import { Request, Response, NextFunction } from 'express';
import { fromZodError } from 'zod-validation-error';
import { ZodError } from 'zod';

export const notFound = (req: Request, res: Response): void => {
   res.status(404).json({ success: false, data: null, message: 'Resource not found' });
};

export const errorHandler = (
   err: Error,
   req: Request,
   res: Response,
   _: NextFunction
): void => {
   const statusCode =
      err instanceof ZodError ? 401 : res.statusCode === 200 ? 500 : res.statusCode;
   const errorMessage: string =
      err instanceof ZodError ? fromZodError(err).toString() : (err as Error).message;

   res.status(statusCode).json({
      success: false,
      data: null,
      message: errorMessage || 'Internal server error.',
   });
};
