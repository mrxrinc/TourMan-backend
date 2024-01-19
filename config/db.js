import mongoose from 'mongoose';

import Log from '../utils/logger.js';

import { MONGO_URL } from './environments.js';

mongoose
  .connect(MONGO_URL)
  .then(() => {
    Log.info('Connected to MongoDB');
  })
  .catch((err) => {
    Log.error(err);
  });
mongoose.Promise = global.Promise;
