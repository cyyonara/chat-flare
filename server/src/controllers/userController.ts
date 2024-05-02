import { User } from '../models/userModel';
import { Response } from 'express';
import { IRequest } from '../utils/types';
import { ZodError, z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import expressAsyncHandler from 'express-async-handler';
import { parsePaginationData } from '../utils/helpers';

export const updateProfilePicture = expressAsyncHandler(
  async (req: IRequest, res: Response): Promise<void> => {
    try {
      const { profilePicture }: { profilePicture: string } = req.body;
      const validatedProfilePicture = z.string().url().parse(profilePicture);
      const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
          $set: { profilePicture: validatedProfilePicture },
        },
        { new: true }
      );

      res.status(201).json({
        success: true,
        data: { newProfilePicture: updatedUser?.profilePicture },
        message: 'Profile picture updated',
      });
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

export const searchUser = expressAsyncHandler(
  async (req: IRequest, res: Response): Promise<void> => {
    const { keyword, page, limit } = req.query;
    const { parsedPage, parsedLimit } = parsePaginationData(
      page as string,
      limit as string
    );
    const offset = (parsedPage - 1) * parsedLimit;
    const results = await User.find({
      $and: [
        { _id: { $ne: req.user?._id } },
        {
          $or: [
            { username: { $regex: keyword, $options: 'i' } },
            { email: { $regex: keyword, $options: 'i' } },
          ],
        },
      ],
    })
      .limit(parsedLimit)
      .skip(offset);

    res.status(200).json({ success: true, data: results, message: '' });
  }
);
