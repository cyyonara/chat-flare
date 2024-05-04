import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller';

const authRouter = Router();

// @POST - public - /api/auth/signup
authRouter.post('/signup', signup);

// @POST - public - /api/auth/login
authRouter.post('/login', login);

export default authRouter;
