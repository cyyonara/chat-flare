import express from "express";
import { googleLogin, googleSignUp, login, signUp } from "../controllers/authController";

const router = express.Router();

// @POST - public - /api/auth/login
router.post("/login", login);

// @POST - public - /api/auth/signup
router.post("/sign-up", signUp);

// @POST - public - /api/auth/google/login
router.post("/google/login", googleLogin);

// @POST - public - /api/auth/google/signup
router.post("/google/sign-up", googleSignUp);

export default router;
