import { IRequest } from '../utils/types';
import { ITokenPayload } from '../utils/types';
import { Response, NextFunction } from 'express';
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';

export const verify = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
    if (req.cookies.cfAuth) {
      try {
        const token: string = req.cookies.cfAuth;
        const { _id } = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as ITokenPayload;
      } catch (error: any) {
        let errorMessage: string;
        let status: number = 401;

        if (error instanceof JsonWebTokenError) {
          errorMessage = 'Unauthorized';
          res.clearCookie('cfAuth');
        } else if (error instanceof TokenExpiredError) {
          errorMessage = 'Token is expired. Try to login again';
          res.clearCookie('cfAuth');
        } else {
          errorMessage = error.message;
          status = 500;
        }

        res.status(status);
        throw new Error(errorMessage);
      }
    } else {
      res.status(401);
      throw new Error('Token is missing');
    }
  }
);
