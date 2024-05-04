import { Router } from 'express';
import { verify } from '../middlewares/verify';
import { createChat } from '../controllers/chat.controller';

const chatRouter = Router();

// @POST - private - /api/chats
chatRouter.post('/', verify, createChat);

export default chatRouter;
