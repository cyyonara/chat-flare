import expressAsyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { ISignupData } from '../utils/types';
import { loginSchema, signupSchema } from '../utils/zod-schemas';
import { fromZodError } from 'zod-validation-error';
import { ZodError } from 'zod';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';

// @POST - public - /api/auth/signup
export const signup = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, username, password }: ISignupData = signupSchema.parse(req.body);
      const isEmailExist = await User.exists({ email });

      if (isEmailExist) {
        res.status(400);
        throw new Error('Email address already exists');
      }

      const isUsernameExist = await User.exists({ username });

      if (isUsernameExist) {
        res.status(400);
        throw new Error('Username already exists');
      }

      const hashedPassword: string = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, email, password: hashedPassword });
      const token: string = newUser.generateToken();

      res
        .cookie('cfAuth', token, {
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'DEV',
          sameSite: process.env.NODE_ENV === 'DEV' ? 'lax' : 'none',
          maxAge: 60_000 * 60 * 24 * 60,
        })
        .status(201)
        .json({
          success: true,
          data: {
            username: newUser.username,
            email: newUser.email,
            profilePicture: newUser.profilePicture,
          },
          message: 'Sign up successful',
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

// @POST - public - /api/auth/login
export const login = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const user = await User.findOne({ email });

      if (!user) {
        res.status(401);
        throw new Error('Invalid email or password');
      }

      const isPasswordsMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordsMatch) {
        res.status(401);
        throw new Error('Invalid email or password');
      }

      const token: string = user.generateToken();
      res
        .cookie('cfAuth', token, {
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'DEV',
          sameSite: process.env.NODE_ENV === 'DEV' ? 'lax' : 'none',
          maxAge: 60_000 * 60 * 24 * 60,
        })
        .status(200)
        .json({
          success: true,
          data: {
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
          },
          message: 'Login successful',
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
