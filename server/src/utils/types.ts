import { z } from 'zod';
import { signupSchema, loginSchema } from '././zod-schemas';
import { Schema } from 'mongoose';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface ISignupData extends z.infer<typeof signupSchema> {}

export interface ILoginData extends z.infer<typeof loginSchema> {}

export interface IRequest extends Request {
  user?: {
    _id: Schema.Types.ObjectId;
    username: string;
    email: string;
    profilePicture: string;
  };
}

export interface ITokenPayload extends JwtPayload {
  _id: string;
}
