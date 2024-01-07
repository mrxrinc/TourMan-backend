import express from 'express';

import {
  getHome,
  getHomes,
  getInArray,
  updateHome,
  deleteHome,
  addHome,
  uploadHomeImage,
} from '../controllers/home.js';
import { handleUploadHomeImage } from '../services/upload.js';

const router = express.Router();

router.get('/all', getHomes);
router.get('/:id', getHome);
router.get('/array/:array', getInArray);
router.post('/', addHome);
router.post(
  '/image',
  handleUploadHomeImage.single('homeImage'),
  uploadHomeImage,
);
router.put('/', updateHome);
router.delete('/', deleteHome);
router.post('/', deleteHome);

export default router;
