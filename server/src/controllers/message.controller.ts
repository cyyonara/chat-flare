import { Message } from '../models/message.model';
import { IRequest } from '../utils/types';
import { Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

// @POST - private - /api/messages/:chatId
export const addMessage = expressAsyncHandler(
  async (req: IRequest, res: Response): Promise<void> => {
    const { chatId } = req.params;
  }
);
