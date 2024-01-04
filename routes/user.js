import express from 'express';

import avatarUpload from '../controllers/upload.js';
import {
  getUserById,
  updateUser,
  getUserMessages,
} from '../controllers/user.js';

const router = express.Router();

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.put('/message/:id', getUserMessages);

router.post('/avatar', avatarUpload);

export default router;
