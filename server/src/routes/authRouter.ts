import express from "express";
import { googleSignUp, login, signUp } from "../controllers/authController";

const router = express.Router();

router.post("/login", login);

router.post("/sign-up", signUp);

router.post("/google/sign-up", googleSignUp);

export default router;
