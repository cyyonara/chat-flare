import { Router } from 'express';
import { verify } from '../middlewares/verify';
import { searchUser, updateProfilePicture } from '../controllers/user.controller';

const userRouter = Router();

// @PATCH - private - /api/user/profile-picture
userRouter.patch('/profile-picture', verify, updateProfilePicture);

// @GET - private - /api/user/search?keyword=?&page=?&limit=?
userRouter.get('/search', verify, searchUser);

export default userRouter;
