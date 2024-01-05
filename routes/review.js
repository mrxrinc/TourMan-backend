import express from 'express';

import { getReviews, addReview } from '../controllers/review.js';

const router = express.Router();

router.get('/:id', getReviews);

router.post('/', addReview);

export default router;
