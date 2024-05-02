import { Router } from 'express';
import { verify } from '../middlewares/verify';
import { searchUser, updateProfilePicture } from '../controllers/userController';

const userRouter = Router();

userRouter.patch('/profile-picture', verify, updateProfilePicture);

userRouter.get('/search', verify, searchUser);

export default userRouter;
