import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { signUpSchema } from "../utils/validation";

export const login = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
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
          data: { _id: user._id, username: user.username, email: user.email },
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

export const signUp = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, username, ...rest } = signUpSchema.parse(req.body);

      const isEmailExist = await User.exists({ email });

      if (isEmailExist) {
        res.status(400);
        throw new Error("Email already in use");
      }

      const isUsernameExist = await User.find({ username });

      if (isUsernameExist) {
        res.status(400);
        throw new Error("Username already in use");
      }

      const user = await User.create({ email, username, ...rest });

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
          data: { _id: user._id, username: user.username, email: user.email },
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
