import expressAsyncHandler from 'express-async-handler';
import { Chat } from '../models/chat.model';
import { Response } from 'express';
import { IRequest } from '../utils/types';
import { fromZodError } from 'zod-validation-error';
import { ZodError } from 'zod';
import { createChatSchema } from '../utils/zod-schemas';
import { User } from '../models/user.model';
import { parsePaginationData } from '../utils/helpers';

// @POST - private - /api/chats
export const createChat = expressAsyncHandler(
  async (req: IRequest, res: Response): Promise<void> => {
    try {
      const { chatName, users, isGroupChat } = createChatSchema.parse(req.body);
      const chat = new Chat({
        chatName,
        chatCreator: req.user?._id,
        isGroupChat,
        users: [
          { user: req.user?._id, hasLeft: false },
          ...users.map((user) => ({ user, hasLeft: false })),
        ],
      });

      if (isGroupChat) {
        const newChat = await chat.save();
        await newChat.populate({
          path: 'chatCreator users.user',
          select: '_id username email profilePicture',
          model: User,
        });

        res
          .status(201)
          .json({ success: true, data: newChat, message: 'Group chat created' });
      } else {
        if (req.user?._id.toString() === users[0]) {
          res.status(400);
          throw new Error('Users cannot duplicate');
        }

        const singleChat = await Chat.findOne({
          $and: [
            { users: { $elemMatch: { user: req.user?._id } } },
            { users: { $elemMatch: { user: users[0] } } },
            { isGroupChat: false },
          ],
        });

        if (singleChat) {
          await singleChat.populate({
            path: 'chatCreator users.user',
            select: '_id username email profilePicture',
            model: User,
          });

          res.status(201).json({ success: true, data: singleChat, message: 'Success' });
        } else {
          const newSingleChat = await chat.save();
          await newSingleChat.populate({
            path: 'chatCreator users.user',
            select: '_id username email profilePicture',
            model: User,
          });

          res.status(201).json({
            success: true,
            data: newSingleChat,
            message: 'Chat created successfully',
          });
        }
      }
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

// @GET - private - /api/chats?page=?&limit=?
export const getChats = expressAsyncHandler(
  async (req: IRequest, res: Response): Promise<void> => {
    const { page, limit } = req.query;
    const { parsedPage, parsedLimit } = parsePaginationData(
      page as string,
      limit as string
    );
  }
);
