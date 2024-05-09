import { Router } from 'express';
import { verify } from '../middlewares/verify';
import { addMessage, getChatMessages } from '../controllers/message.controller';

const messageRouter = Router();

// @POST - private - /api/messages/:chatId
messageRouter.post('/:chatId', verify, addMessage);

// @GET - private - /api/messages/:chatId
messageRouter.get('/:chatId', verify, getChatMessages);

export default messageRouter;
