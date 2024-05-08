import { Router } from 'express';
import { verify } from '../middlewares/verify';
import { addMessage } from '../controllers/message.controller';

const messageRouter = Router();

// @GET - private - /api/messages/:chatId
messageRouter.get('/:chatId', verify);

// @POST - private - /api/messages/:chatId
messageRouter.post('/:chatId', verify, addMessage);

export default messageRouter;
