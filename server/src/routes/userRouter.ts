import express from "express";
import { verifyUser } from "../middlewares/verifyUser";
import { searchUser, setupAccount } from "../controllers/userController";

const router = express.Router();

// @PUT - private - /api/user/account/setup
router.put("/account/setup", verifyUser, setupAccount);

// @GET - private - /api/user/search?keyword=?
router.get("/search", verifyUser, searchUser);

export default router;
