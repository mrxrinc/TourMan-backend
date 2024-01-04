import express from 'express';

import {
  getUserById,
  updateUser,
  addMessage,
  avatarUpload,
} from '../controllers/user.js';
import handleAvatarUpload from '../services/upload.js';

const router = express.Router();

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.put('/message/:id', addMessage);

router.post('/avatar', handleAvatarUpload.single('userAvatar'), avatarUpload);

export default router;
