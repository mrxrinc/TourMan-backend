import path from 'path';

import multer from 'multer';

import { AVATARS_DIR } from '../config/constants.js';
import uniqueSuffix from '../utils/random.js';

const userStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, AVATARS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const userFileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(
      new Error('file format is not allowed!', { status: 403, type: 'upload' }),
    );
  }
};

const handleAvatarUpload = multer({
  storage: userStorage,
  fileFilter: userFileFilter,
  limits: { fileSize: 1024 * 1024 * 6 },
}).single('userAvatar');

export default handleAvatarUpload;
