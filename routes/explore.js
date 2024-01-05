import express from 'express';

import {
  getExplores,
  addExplore,
  updateExplore,
} from '../controllers/explore.js';

const router = express.Router();

router.get('/', getExplores);

router.post('/', addExplore);

router.put('/:id', updateExplore);

export default router;
