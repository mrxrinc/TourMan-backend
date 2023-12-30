import express from 'express';
import jwt from 'jsonwebtoken';

import { SECRET_KEY, URL } from '../config/environments.js';
import { signin, signup } from '../controllers/auth.js';
import persianDate from '../utils/time.js';
import validateUser from '../utils/validations.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);

export default router;
