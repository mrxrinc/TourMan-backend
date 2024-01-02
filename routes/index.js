import express from 'express';

import apiRoutes from './api.js';
import authRoutes from './auth.js';
import userRoutes from './user.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/', apiRoutes);

// router.use((err, req, res, next) => {
//   res.status(422).send({ error: err._message });
// });

export default router;
