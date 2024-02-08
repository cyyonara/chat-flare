import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import {
  signUpSchema,
  loginSchema,
  googleSignUpSchema,
  googleLoginSchema,
} from "../lib/validations";

// @POST - public - /api/auth/login
export const login = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const user = await User.findOne({ email });

      if (!user) {
        res.status(400);
        throw new Error("Invalid email or password");
      }

      const isValidPassword: boolean = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        res.status(400);
        throw new Error("Invalid email or password");
      }

      const token: string = user.generateToken();
      res
        .status(200)
        .cookie("cfAuth", token, {
          path: "/",
          httpOnly: true,
          maxAge: 60 * (1000 * 60 * 60 * 24),
          sameSite: process.env.NODE_ENV === "dev" ? "none" : "lax",
          secure: process.env.NODE_ENV === "dev",
        })
        .json({
          success: true,
          data: {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
          },
          message: "Login success",
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

// @POST - public - /api/auth/signup
export const signup = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, username, password } = signUpSchema.parse(req.body);

      const isEmailExist = await User.exists({ email });

      if (isEmailExist) {
        res.status(400);
        throw new Error("Email already in use");
      }

      const isUsernameExist = await User.exists({ username });

      if (isUsernameExist) {
        res.status(400);
        throw new Error("Username already in use");
      }

      const hashedPassword: string = await bcrypt.hash(password, 10);
      const user = await User.create({ email, username, password: hashedPassword });

      const token: string = user.generateToken();
      res
        .status(201)
        .cookie("cfAuth", token, {
          path: "/",
          httpOnly: true,
          maxAge: 60 * (1000 * 60 * 60 * 24),
          sameSite: process.env.NODE_ENV === "dev" ? "lax" : "none",
          secure: process.env.NODE_ENV !== "dev",
        })
        .json({
          success: true,
          data: {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
          },
          message: "Sign up success",
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

// @POST - public - /api/auth/google/login
export const googleLogin = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = googleLoginSchema.parse(req.body);
      const user = await User.findOne({ email });

      if (!user) {
        res.status(400);
        throw new Error("Email isn't connected to an account. Try to sign up first");
      }

      const token: string = user.generateToken();
      res
        .status(200)
        .cookie("cfAuth", token, {
          path: "/",
          httpOnly: true,
          maxAge: 60 * (1000 * 60 * 60 * 24),
          sameSite: process.env.NODE_ENV === "dev" ? "lax" : "none",
          secure: process.env.NODE_ENV !== "dev",
        })
        .json({
          success: true,
          data: {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
          },
          message: "Login success",
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

// @POST - public - /api/auth/google/signup
export const googleSignup = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, username, avatar, password } = googleSignUpSchema.parse(req.body);
      const isEmailExist = await User.exists({ email });

      if (isEmailExist) {
        res.status(400);
        throw new Error("This email is already connected to an account");
      }

      const hashedPassword: string = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        username,
        avatar,
        password: hashedPassword,
      });

      const token: string = user.generateToken();
      res
        .status(201)
        .cookie("cfAuth", token, {
          path: "/",
          httpOnly: true,
          maxAge: 60 * (1000 * 60 * 60 * 24),
          sameSite: process.env.NODE_ENV === "dev" ? "none" : "lax",
          secure: process.env.NODE_ENV === "dev",
        })
        .json({
          success: true,

          data: {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
          },
          message: "Sign up success",
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
