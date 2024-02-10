import { Response } from "express";
import { IRequest } from "../lib/types";
import User from "../models/userModel";
import expressAsyncHandler from "express-async-handler";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";
import { setupSchema } from "../lib/validations";

// @PUT - private - /api/user/account/setup
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

// @GET - private - /api/user/search?keyword=?
export const searchUser = expressAsyncHandler(
  async (req: IRequest, res: Response): Promise<void> => {
    const keyword = req.query.keyword;
    const users = await User.find({
      $and: [
        { _id: { $ne: req.user?._id } },
        {
          $or: [
            { username: { $regex: keyword, $options: "i" } },
            { email: { $regex: keyword, $options: "i" } },
          ],
        },
      ],
    }).select("_id username email avatar");

    res.status(200).json({
      success: true,
      data: users,
      message: null,
    });
  }
);
