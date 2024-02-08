import express from "express";
import { googleLogin, googleSignup, login, signup } from "../controllers/authController";

const router = express.Router();

// @POST - public - /api/auth/login
router.post("/login", login);

// @POST - public - /api/auth/signup
router.post("/signup", signup);

// @POST - public - /api/auth/google/login
router.post("/google/login", googleLogin);

// @POST - public - /api/auth/google/signup
router.post("/google/signup", googleSignup);

export default router;
