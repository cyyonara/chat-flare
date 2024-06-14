import { Router } from 'express';
import { verify } from '../middlewares/verify';
import {
   addMessage,
   getChatMessages,
   updateMessageReactions,
} from '../controllers/message.controller';

const messageRouter = Router();

// @POST - private - /api/messages/:chatId
messageRouter.post('/:chatId', verify, addMessage);

// @GET - private - /api/messages/:chatId
messageRouter.get('/:chatId', verify, getChatMessages);

// @PATCH - private - /api/messages/:messageId/reaction
messageRouter.patch('/:messageId/reaction', verify, updateMessageReactions);

export default messageRouter;
