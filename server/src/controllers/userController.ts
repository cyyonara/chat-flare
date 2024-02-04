import { Response } from "express";
import { IRequest } from "../utils/types";
import User from "../models/userModel";
import expressAsyncHandler from "express-async-handler";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";
import { setupSchema } from "../utils/validations";

export const setupAccount = expressAsyncHandler(
  async (req: IRequest, res: Response): Promise<void> => {
    try {
      const { avatar } = setupSchema.parse(req.body);
      const user = await User.findByIdAndUpdate(
        req.user?._id,
        { $set: { avatar } },
        { new: true }
      );

      res.status(201).json({
        success: true,
        data: {
          _id: user?._id,
          username: user?.username,
          email: user?.email,
          avatar: user?.avatar,
        },
        message: "Setup success",
      });
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
