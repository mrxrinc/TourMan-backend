import mongoose from 'mongoose';

import { MONGO_URI } from './environments.js';

mongoose.connect(MONGO_URI);
mongoose.Promise = global.Promise;
