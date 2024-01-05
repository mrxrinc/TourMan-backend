import express from 'express';

import { help, feedback } from '../controllers/misc.js';

const router = express.Router();

router.get('/help', help);

router.post('/feedback', feedback);

export default router;
