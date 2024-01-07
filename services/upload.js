import path from 'path';

import multer from 'multer';

import { AVATARS_DIR, HOME_IMAGES_DIR } from '../config/constants.js';
import { uniqueSuffix } from '../utils/helpers.js';

import Error from './error.js';

const limits = { fileSize: 1024 * 1024 * 6 }; // 6MB

const getStorage = (dir) =>
  multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, dir);
    },
    filename: (_req, file, cb) => {
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

const fileFilter = (req, file, cb) => {
  if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error('file format is not allowed!', { status: 403, type: 'upload' }),
    );
  }
};

export const handleAvatarUpload = multer({
  limits,
  fileFilter,
  storage: getStorage(`../${AVATARS_DIR}`),
});

export const handleUploadHomeImage = multer({
  limits,
  fileFilter,
  storage: getStorage(`../${HOME_IMAGES_DIR}`),
});
