import express from 'express';
import userRoutes from './user.js';
import apiRoutes from './api.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/', apiRoutes);

router.use((err, req, res, next) => {
  res.status(422).send({ error: err._message });
});

export default router;
