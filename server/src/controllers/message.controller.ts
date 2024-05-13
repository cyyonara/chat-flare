import { Message } from '../models/message.model';
import { IRequest } from '../utils/types';
import { Response } from 'express';
import { fromZodError } from 'zod-validation-error';
import { ZodError } from 'zod';
import { addMessageSchema } from '../utils/validations';
import { Chat } from '../models/chat.model';
import expressAsyncHandler from 'express-async-handler';
import { User } from '../models/user.model';
import { getPaginationResponse, parsePaginationData } from '../utils/helpers';

// @POST - private - /api/messages/:chatId
export const addMessage = expressAsyncHandler(
  async (req: IRequest, res: Response): Promise<void> => {
    try {
      const { content, isImage } = addMessageSchema.parse(req.body);
      const { chatId } = req.params;

      const chat = await Chat.findOne({
        _id: chatId,
        users: { $elemMatch: { user: req.user?._id, hasLeft: false } },
      });

      if (!chat) {
        res.status(404);
        throw new Error('Chat is not existing');
      }

      const messageReceivers = chat.users.filter(
        (user) => user.user.toString() !== req.user?._id.toString()
      );

      const message = new Message({
        chatId,
        content,
        isImage,
        sender: req.user?._id,
        receivers: messageReceivers,
      });

      await message.save();
      chat.lastMessage = message._id;

      const updatedChat = await chat.save();

      await updatedChat.populate({
        path: 'chatCreator users.user',
        select: '_id username email profilePicture',
        model: User,
      });

      await updatedChat.populate({
        path: 'lastMessage',
        model: Message,
        populate: {
          path: 'sender receivers.user',
          select: '_id username email profilePicture',
          model: User,
        },
      });

      res.status(201).json({
        success: true,
        data: updatedChat,
        message: 'Message saved successfully',
      });
    } catch (error: any) {
      let errorMessage: string;

      if (error instanceof ZodError) {
        res.status(400);
        errorMessage = fromZodError(error).toString();
      } else {
        errorMessage = (error as Error).message;
      }

      throw new Error(errorMessage);
    }
  }
);

// @GET - private - /api/messages/:chatId?page=?&limit=?
export const getChatMessages = expressAsyncHandler(
  async (req: IRequest, res: Response): Promise<void> => {
    const { page, limit } = req.query;
    const { chatId } = req.params;
    const { parsedPage, parsedLimit } = parsePaginationData(
      page as string,
      limit as string
    );

    const isChatExists = await Chat.exists({
      _id: chatId,
      users: { $elemMatch: { user: req.user?._id, hasLeft: false } },
    });

    if (!isChatExists) {
      res.status(404);
      throw new Error('Messages not found');
    }

    const offset = (parsedPage - 1) * parsedLimit;
    const messages = await Message.find({ chatId })
      .skip(offset)
      .limit(parsedLimit)
      .sort({ createdAt: -1 })
      .populate({
        path: 'sender receivers.user',
        select: '_id username email profilePicture',
        model: User,
      });

    const messagesCount = await Message.countDocuments();
    const { nextPage, hasNextPage, totalPages } = getPaginationResponse(
      messagesCount,
      parsedLimit,
      parsedPage
    );

    res.status(200).json({
      success: true,
      data: {
        chatId,
        totalPages,
        totalMessages: messagesCount,
        messages,
        currentPage: parsedPage,
        nextPage,
        hasNextPage,
      },
    });
  }
);
