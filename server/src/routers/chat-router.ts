import { Router } from 'express';
import { verify } from '../middlewares/verify';
import {
  createChat,
  getChats,
  getChat,
  changeGroupChatPhoto,
  changeGroupName,
  removeMember,
  searchNonExistingGroupMember,
  addGroupMember,
} from '../controllers/chat-controller';

const router = Router();

// @POST - private - /api/chats
router.post('/', verify, createChat);

// @GET - private - /api/chats
router.get('/', verify, getChats);

// @GET - private - /api/chats/:chatId
router.get('/:chatId', verify, getChat);

// @PATCH - private - /api/chats/:chatId/chat-photo
router.patch('/:chatId/chat-photo', verify, changeGroupChatPhoto);

// @PATCH - private - /api/chats/:chatId/group-name
router.patch('/:chatId/group-name', verify, changeGroupName);

// @DELETE - private - /api/chats/:chatId/members/:userId
router.delete('/:chatId/members/:userId', verify, removeMember);

// @GET - private - /api/chats/:chatId/members/search?keyword=?&page=?&limit=?
router.get('/:chatId/members/search', verify, searchNonExistingGroupMember);

// @PATCH - private - /api/chats/:chatId/members
router.patch('/:chatId/members', verify, addGroupMember);

export default router;
