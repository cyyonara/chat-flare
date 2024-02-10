import Chat from "../models/chatModel";
import Message from "../models/messageModel";
import User from "../models/userModel";
import { Response } from "express";
import { IRequest } from "../lib/types";
import expressAsyncHandler from "express-async-handler";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { createChatSchema } from "../lib/validations";

export const createChat = expressAsyncHandler(
  async (req: IRequest, res: Response): Promise<void> => {
    try {
      const { people, isGroupChat } = createChatSchema.parse(req.body);

      if (isGroupChat) {
        const groupChat = await Chat.create({
          chatCreator: req.user?._id,
          people: [...people, req.user?._id],
          isGroupChat: true,
        });

        await groupChat.populate({
          path: "chatCreator people",
          select: "_id username email avatar",
          model: User,
        });

        await groupChat.populate({
          path: "lastMessage",
          model: Message,
          populate: {
            path: "sender receiver",
            select: "_id username email avatar",
            model: User,
          },
        });

        res.status(201).json({
          success: true,
          data: groupChat,
          message: "Group chat created",
        });
      } else {
        const chat = await Chat.findOne({
          $and: [
            { isGroupChat: false },
            { people: { $elemMatch: { $eq: req.user?._id } } },
            { people: { $elemMatch: { $eq: people[0] } } },
          ],
        });

        if (chat) {
          await chat.populate({
            path: "chatCreator people",
            select: "_id username email avatar",
            model: User,
          });

          await chat.populate({
            path: "lastMessage",
            model: Message,
            populate: {
              path: "sender receiver",
              select: "_id username email avatar",
              model: User,
            },
          });

          res.status(201).json({
            success: true,
            data: chat,
            message: null,
          });
        } else {
          const newChat = await Chat.create({
            chatCreator: req.user?._id,
            people: [people[0], req.user?._id],
            isGroupChat,
          });

          await newChat.populate({
            path: "chatCreator people",
            select: "_id username email avatar",
            model: User,
          });

          await newChat.populate({
            path: "lastMessage",
            model: Message,
            populate: {
              path: "sender receiver",
              select: "_id username email avatar",
              model: User,
            },
          });

          res.status(201).json({
            success: true,
            data: newChat,
            message: "Chat created",
          });
        }
      }
    } catch (error: any) {
      let errorMessage: string;

      if (error instanceof ZodError) {
        res.status(400);
        errorMessage = fromZodError(error).toString();
      } else {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  }
);

// @GET - private - /api/chats
export const getChats = expressAsyncHandler(
  async (req: IRequest, res: Response): Promise<void> => {
    const chats = await Chat.find({
      $and: [
        { people: { $elemMatch: { $eq: req.user?._id } } },
        {
          $or: [
            { isGroupChat: true },
            { isGroupChat: false, lastMessage: { $ne: null } },
          ],
        },
      ],
    })
      .populate({
        path: "chatCreator people",
        select: "_id username email avatar",
        model: User,
      })
      .populate({
        path: "lastMessage",
        model: Message,
        populate: {
          path: "sender receiver",
          select: "_id username email avatar",
          model: User,
        },
      });

    res.status(200).json({
      success: true,
      data: chats,
      message: null,
    });
  }
);
