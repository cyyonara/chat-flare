import express from "express";
import { verifyUser } from "../middlewares/verifyUser";
import { createChat, getChats } from "../controllers/chatController";

const router = express.Router();

// @POST - private - /api/chats
router.post("/", verifyUser, createChat);

// @GET - private - /api/chats
router.get("/", verifyUser, getChats);

export default router;
