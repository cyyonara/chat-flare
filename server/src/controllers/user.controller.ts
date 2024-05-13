import { User } from '../models/user.model';
import { Response } from 'express';
import { IRequest } from '../utils/types';
import { ZodError, z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { parsePaginationData, getPaginationResponse } from '../utils/helpers';
import expressAsyncHandler from 'express-async-handler';

// @PATCH - private - /api/user/profile-picture
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
        errorMessage = (error as Error).message;
      }

      throw new Error(errorMessage);
    }
  }
);

// @GET - private - /api/user/search?keyword=?&page=?&limit=?
export const searchUser = expressAsyncHandler(
  async (req: IRequest, res: Response): Promise<void> => {
    const { keyword, page, limit } = req.query;
    const { parsedPage, parsedLimit } = parsePaginationData(
      page as string,
      limit as string
    );
    const offset = (parsedPage - 1) * parsedLimit;
    const result = await User.find({
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
      .skip(offset)
      .select('username email profilePicture');

    const usersCount = await User.countDocuments({ _id: { $ne: req.user?._id } });
    const { nextPage, hasNextPage, totalPages } = getPaginationResponse(
      usersCount,
      parsedLimit,
      parsedPage
    );

    res.status(200).json({
      success: true,
      data: {
        totalPages,
        totalUsers: usersCount,
        users: result,
        currentPage: parsedPage,
        nextPage,
        hasNextPage,
      },
      message: 'Success',
    });
  }
);
