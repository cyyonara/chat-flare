import { Router } from 'express';
import {
  signup,
  login,
  googleLogin,
  googleSignup,
  logout,
} from '../controllers/auth-controller';

const router = Router();

// @POST - public - /api/auth/signup
router.post('/signup', signup);

// @POST - public - /api/auth/login
router.post('/login', login);

// @POST - public - /api/auth/google-login
router.post('/google-login', googleLogin);

// @POST - public - /api/auth/google-signup
router.post('/google-signup', googleSignup);

// @DELETE - public - /api/auth/logout
router.delete('/logout', logout);

export default router;
