import { Router } from 'express';
import { verify } from '../middlewares/verify';
import { createChat, getChats, getChat } from '../controllers/chat.controller';

const router = Router();

// @POST - private - /api/chats
router.post('/', verify, createChat);

// @GET - private - /api/chats
router.get('/', verify, getChats);

// @GET - private - /api/chats/:chatId
router.get('/:chatId', verify, getChat);

export default router;
