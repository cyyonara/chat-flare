import { Router } from 'express';
import { verify } from '../middlewares/verify';
import { createChat, getChats, getChat } from '../controllers/chat.controller';

const chatRouter = Router();

// @POST - private - /api/chats
chatRouter.post('/', verify, createChat);

// @GET - private - /api/chats
chatRouter.get('/', verify, getChats);

// @GET - private - /api/chats/:chatId
chatRouter.get('/:chatId', verify, getChat);

export default chatRouter;
