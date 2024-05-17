import { Router } from 'express';
import { signup, login, googleLogin, googleSignup } from '../controllers/auth.controller';

const authRouter = Router();

// @POST - public - /api/auth/signup
authRouter.post('/signup', signup);

// @POST - public - /api/auth/login
authRouter.post('/login', login);

// @POST - public - /api/auth/google-login
authRouter.post('/google-login', googleLogin);

// @POST - public - /api/auth/google-signup
authRouter.post('/google-signup', googleSignup);

export default authRouter;
