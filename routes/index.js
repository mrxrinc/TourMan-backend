import express from 'express';

import { invalidPathHandler } from '../middlewares/errors.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

import authRoutes from './auth.js';
import exploreRoutes from './explore.js';
import homeRoutes from './home.js';
import miscRoutes from './misc.js';
import privacyRoutes from './privacy.js';
import reserveRoutes from './reserve.js';
import reviewRoutes from './review.js';
import userRoutes from './user.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', isLoggedIn, userRoutes);
router.use('/home', isLoggedIn, homeRoutes);
router.use('/explore', isLoggedIn, exploreRoutes);
router.use('/reserve', isLoggedIn, reserveRoutes);
router.use('/review', isLoggedIn, reviewRoutes);
router.use('/privacy', isLoggedIn, privacyRoutes);
router.use('/misc', isLoggedIn, miscRoutes);

router.use('*', invalidPathHandler);

export default router;
