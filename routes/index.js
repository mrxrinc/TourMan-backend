import express from 'express';

import isLoggedIn from '../middlewares/isLoggedIn.js';

import apiRoutes from './api.js';
import authRoutes from './auth.js';
import miscRoutes from './misc.js';
import privacyRoutes from './privacy.js';
import userRoutes from './user.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', isLoggedIn, userRoutes);
router.use('/privacy', isLoggedIn, privacyRoutes);
router.use('/misc', isLoggedIn, miscRoutes);
// router.use('/', apiRoutes);

export default router;
