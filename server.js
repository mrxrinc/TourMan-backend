import express from 'express';

import { API_PATH, PORT } from './config/environments.js';
import {
  applyPriorMiddlewares,
  applyErrorHandlingMiddlewares,
} from './middlewares/index.js';
import routes from './routes/index.js';
import './config/db.js';

const app = express();

applyPriorMiddlewares(app);

app.use(API_PATH, routes);

applyErrorHandlingMiddlewares(app);

app.listen(PORT, () => {
  console.log(`==========> SERVER IS READY ON PORT ${PORT}!`);
});
