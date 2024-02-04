import { Request } from "express";
import { HydratedDocument, Types } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

export interface IRequest extends Request {
  user?: HydratedDocument<{
    _id: Types.ObjectId;
    email: string;
    username: string;
    avatar: string;
    password: string;
  }>;
}

export interface ITokenPayload extends JwtPayload {
  id: string;
}
