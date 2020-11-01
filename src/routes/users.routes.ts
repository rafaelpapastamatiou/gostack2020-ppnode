import { Router } from 'express';

import multer from 'multer';

import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = new CreateUserService();

  const { id, created_at, updated_at } = await createUser.execute({
    name,
    email,
    password,
  });

  return res.json({ id, name, email, created_at, updated_at });
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const { id } = req.user;
    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      user_id: id,
      avatarFilename: req.file.filename,
    });

    const { password, ...userData } = user;

    return res.json({ ...userData });
  },
);

export default usersRouter;
