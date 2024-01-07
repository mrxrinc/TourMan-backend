import express from 'express';

import {
  getHome,
  getHomes,
  getInArray,
  updateHome,
  deleteHome,
  addHome,
  uploadImage,
} from '../controllers/home.js';
import { handleHomeImageUpload } from '../services/upload.js';

const router = express.Router();

router.get('/all', getHomes);
router.get('/:id', getHome);
router.get('/array/:array', getInArray);
router.post('/', addHome);
router.put('/', updateHome);
router.delete('/', deleteHome);
router.post('/image', handleHomeImageUpload.single('homeImage'), uploadImage);

export default router;
