import express from "express";
import { verifyUser } from "../middlewares/verifyUser";
import { setupAccount } from "../controllers/userController";

const router = express.Router();

router.put("/account/setup", verifyUser, setupAccount);

export default router;
