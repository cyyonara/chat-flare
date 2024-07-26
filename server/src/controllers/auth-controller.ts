import expressAsyncHandler from 'express-async-handler';
import { CookieOptions, Request, Response } from 'express';
import { ISignupData } from '../utils/types';
import { googleSignupSchema, loginSchema, signupSchema } from '../utils/validations';
import { fromZodError } from 'zod-validation-error';
import { ZodError } from 'zod';
import { User } from '../models/user-model';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

const cookieOptions: CookieOptions = {
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV !== 'DEV',
  sameSite: process.env.NODE_ENV === 'DEV' ? 'lax' : 'none',
  maxAge: 60_000 * 60 * 24 * 60, // 60 days
};

// @POST - public - /api/auth/signup
export const signup = expressAsyncHandler(async (req: Request, res: Response) => {
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
    .cookie('cfAuth', token, cookieOptions)
    .status(201)
    .json({
      success: true,
      data: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      },
      message: 'Sign up successful',
    });
});

// @POST - public - /api/auth/login
export const login = expressAsyncHandler(async (req: Request, res: Response) => {
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
    .cookie('cfAuth', token, cookieOptions)
    .status(200)
    .json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
      message: 'Login successful',
    });
});

// @POST - public - /api/auth/google-login
export const googleLogin = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email } = loginSchema.pick({ email: true }).parse(req.body);
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Email isn't connected to an account");
  }

  const token: string = user.generateToken();

  res
    .cookie('cfAuth', token, cookieOptions)
    .status(200)
    .json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
      message: 'Login success',
    });
});

// @POST - public - /api/auth/google-signup
export const googleSignup = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, ...rest } = googleSignupSchema.parse(req.body);
  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error('This email is already connected to an account');
  }

  const hashedPassword = await bcrypt.hash(uuid(), 10);
  const newUser = await User.create({ email, password: hashedPassword, ...rest });
  const token: string = newUser.generateToken();

  res
    .cookie('cfAuth', token, cookieOptions)
    .status(201)
    .json({
      success: true,
      data: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      },
      message: 'Sign up successful',
    });
});

// @DELETE - public - /api/auth/logout
export const logout = (req: Request, res: Response) => {
  res
    .clearCookie('cfAuth')
    .status(200)
    .json({ success: true, data: null, message: 'Logged out successfully.' });
};
