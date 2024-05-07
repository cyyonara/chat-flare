import { Router } from 'express';
import { verify } from '../middlewares/verify';
import { createChat, getChats } from '../controllers/chat.controller';

const chatRouter = Router();

// @POST - private - /api/chats
chatRouter.post('/', verify, createChat);

// @GET - private - /api/chats
chatRouter.get('/', verify, getChats);

export default chatRouter;
