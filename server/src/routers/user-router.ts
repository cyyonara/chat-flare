import { Router } from 'express';
import { verify } from '../middlewares/verify';
import { searchUser, updateProfilePicture } from '../controllers/user-controller';

const router = Router();

// @PATCH - private - /api/user/profile-picture
router.patch('/profile-picture', verify, updateProfilePicture);

// @GET - private - /api/user/search?keyword=?&page=?&limit=?
router.get('/search', verify, searchUser);

export default router;
