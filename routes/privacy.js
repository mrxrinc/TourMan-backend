import express from 'express';

import { getPrivacies, addPrivacy } from '../controllers/privacy.js';

const router = express.Router();

router.get('/', getPrivacies);

router.post('/', addPrivacy);

export default router;
