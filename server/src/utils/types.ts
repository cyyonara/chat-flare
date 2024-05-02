import { z } from 'zod';
import { signupSchema, loginSchema } from '././zod-schemas';
import { Types, HydratedDocument } from 'mongoose';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface ISignupData extends z.infer<typeof signupSchema> {}

export interface ILoginData extends z.infer<typeof loginSchema> {}

export interface IRequest extends Request {
  user?: HydratedDocument<{
    _id: Types.ObjectId;
    username: string;
    email: string;
    profilePicture: string;
    password: string;
  }>;
}

export interface ITokenPayload extends JwtPayload {
  _id: string;
}

export interface IPaginationData {
  parsedPage: number;
  parsedLimit: number;
}
