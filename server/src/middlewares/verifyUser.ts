import { IRequest } from "../utils/types";
import { Response, NextFunction } from "express";
import User from "../models/userModel";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { ITokenPayload } from "../utils/types";
import expressAsyncHandler from "express-async-handler";
import { MongooseError } from "mongoose";

export const verifyUser = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
    if (req.cookies.cfAuth) {
      try {
        const token: string = req.cookies.cfAuth;
        const { id } = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as ITokenPayload;

        const user = await User.findById(id);

        if (!user) {
          res.status(401);
          throw new Error("The id in the token is not found");
        }

        req.user = user;
        next();
      } catch (error: any) {
        let errorMessage: string;

        if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
          res.status(401);
          errorMessage = "Invalid Token";
        } else if (error instanceof MongooseError) {
          res.status(500);
          errorMessage = "Internal Server Error";
        } else {
          errorMessage = error.message;
        }

        res.clearCookie("cfAuth");
        throw new Error(errorMessage);
      }
    } else {
      res.status(401);
      throw new Error("Token is missing");
    }
  }
);
