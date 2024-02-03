import express, { IRouter } from "express";
import { login, signUp } from "../controllers/authController";

const router: IRouter = express.Router();

router.post("/login", login);

router.post("/sign-up", signUp);

export default router;
