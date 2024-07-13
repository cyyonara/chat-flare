import expressAsyncHandler from 'express-async-handler';
import { Chat } from '../models/chat.model';
import { Response } from 'express';
import { IRequest } from '../utils/types';
import { createChatSchema, newGroupChatPhotoSchema } from '../utils/validations';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { getPaginationResponse, parsePaginationData } from '../utils/helpers';

// @POST - private - /api/chats
export const createChat = expressAsyncHandler(async (req: IRequest, res: Response) => {
  const { chatName, users, isGroupChat } = createChatSchema.parse(req.body);
  const chat = new Chat({
    chatPhoto: req.user?.profilePicture,
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

    res.status(201).json({
      success: true,
      data: newChat,
      message: 'Group chat created',
    });
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
});

// @GET - private - /api/chats?page=?&limit=?
export const getChats = expressAsyncHandler(async (req: IRequest, res: Response) => {
  const { page, limit } = req.query;
  const { parsedPage, parsedLimit } = parsePaginationData(
    page as string,
    limit as string
  );

  const offset = (parsedPage - 1) * parsedLimit;
  const chatFilter = {
    $and: [
      { users: { $elemMatch: { user: req.user?._id, hasLeft: false } } },
      {
        $or: [{ isGroupChat: true }, { isGroupChat: false, lastMessage: { $ne: null } }],
      },
    ],
  };

  const chats = await Chat.find(chatFilter)
    .sort({ updatedAt: -1 })
    .limit(parsedLimit)
    .skip(offset)
    .populate({
      path: 'chatCreator users.user',
      select: '_id username email profilePicture',
      model: User,
    })
    .populate({
      path: 'lastMessage',
      model: Message,
      populate: {
        path: 'sender receivers.user reactors.user',
        select: '_id username email profilePicture',
        model: User,
      },
    });

  const chatsCount = await Chat.countDocuments(chatFilter);
  const { nextPage, hasNextPage, totalPages } = getPaginationResponse(
    chatsCount,
    parsedLimit,
    parsedPage
  );

  res.status(200).json({
    success: true,
    data: {
      totalPages,
      totalChats: chatsCount,
      chats,
      currentPage: parsedPage,
      nextPage,
      hasNextPage,
    },
    message: 'Success',
  });
});

// @GET - private - /api/chats/:chatId
export const getChat = expressAsyncHandler(async (req: IRequest, res: Response) => {
  const { chatId } = req.params;

  const chat = await Chat.findOne({
    _id: chatId,
    users: { $elemMatch: { user: req.user?._id, hasLeft: false } },
  })
    .populate({
      path: 'chatCreator users.user',
      select: '_id username email profilePicture',
      model: User,
    })
    .populate({
      path: 'lastMessage',
      model: Message,
      populate: {
        path: 'sender receivers.user reactors.user',
        select: '_id username email profilePicture',
        model: User,
      },
    });

  if (!chat) {
    res.status(404);
    throw new Error('Chat not found');
  }

  res.status(200).json({ success: true, data: chat, message: 'Success' });
});

// @PATCH - private - /api/chats/:chatId/chat-photo
export const changeGroupChatPhoto = expressAsyncHandler(
  async (req: IRequest, res: Response) => {
    const { newGroupChatPhoto } = newGroupChatPhotoSchema.parse(req.body);
    const { chatId } = req.params;

    const chat = await Chat.findOne({
      _id: chatId,
      isGroupChat: true,
      users: { $elemMatch: { user: req.user?._id, hasLeft: false } },
    });

    if (!chat) {
      res.status(404);
      throw new Error('Chat not found.');
    }

    chat.chatPhoto = newGroupChatPhoto;
    const updatedChat = await chat.save();

    await updatedChat.populate({
      path: 'users.user',
      select: '_id username email profilePicture',
      model: User,
    });

    await updatedChat.populate({
      path: 'lastMessage',
      model: Message,
      populate: {
        path: 'sender receivers.user reactors.user',
        select: '_id username email profilePicture',
        model: User,
      },
    });

    res.status(201).json({
      success: true,
      data: updatedChat,
      message: 'Group photo successfully changed.',
    });
  }
);
