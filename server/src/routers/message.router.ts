import { Router } from 'express';
import { verify } from '../middlewares/verify';
import {
   addMessage,
   getChatMessages,
   updateMessageReactions,
} from '../controllers/message.controller';

const router = Router();

// @POST - private - /api/messages/:chatId
router.post('/:chatId', verify, addMessage);

// @GET - private - /api/messages/:chatId
router.get('/:chatId', verify, getChatMessages);

// @PATCH - private - /api/messages/:messageId/reaction
router.patch('/:messageId/reaction', verify, updateMessageReactions);

export default router;
