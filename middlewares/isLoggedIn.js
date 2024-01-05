import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../config/environments.js';
import Error from '../services/error.js';

export default async function isLoggedIn(req, _res, next) {
  try {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const token = bearer[1];
      await jwt.verify(token, SECRET_KEY);
      next();
    } else {
      throw new Error('Not Logged in!', { status: 403 });
    }
  } catch (error) {
    next(error);
  }
}
