import expressAsyncHandler from 'express-async-handler';
import { Chat } from '../models/chat.model';
import { Response } from 'express';
import { IRequest } from '../utils/types';
import { fromZodError } from 'zod-validation-error';
import { ZodError } from 'zod';

// @POST - private - /api/chats
export const createChat = expressAsyncHandler(
  async (req: IRequest, res: Response): Promise<void> => {
    try {
    } catch (error: any) {
      let errorMessage: string;

      if (error instanceof ZodError) {
        errorMessage = fromZodError(error).toString();
        res.status(400);
      } else {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  }
);
