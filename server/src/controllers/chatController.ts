import Chat from "../models/chatModel";
import Message from "../models/messageModel";
import User from "../models/userModel";
import { Response } from "express";
import { IRequest } from "../utils/types";
import expressAsyncHandler from "express-async-handler";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { createChatSchema } from "../utils/validations";

export const createChat = expressAsyncHandler(
  async (req: IRequest, res: Response): Promise<void> => {
    try {
      const { people, isGroupChat } = createChatSchema.parse(req.body);

      if (isGroupChat) {
        const groupChat = await Chat.create({
          people: [...people, req.user?._id],
          isGroupChat,
        });
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
