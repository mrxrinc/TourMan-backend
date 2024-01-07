import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../config/environments.js';
import Error from '../services/error.js';

export default async function isLoggedIn(req, _res, next) {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) {
    return next(new Error('Not Logged in!', { status: 403 }));
  }

  const bearerToken = bearerHeader.split(' ')[1];

  try {
    await jwt.verify(bearerToken, SECRET_KEY);
    next();
  } catch (error) {
    next(error);
  }
}
