import bodyParser from 'body-parser';
import express from 'express';

import { errorResponder, errorLogger, invalidPathHandler } from './errors.js';
import requestLogger from './logger.js';

export default function applyMiddlewares(app) {
  app.use('/uploads', express.static('uploads')); // access permission
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(requestLogger);
  app.use(errorLogger);
  app.use(errorResponder);
  //   app.use(invalidPathHandler);
}
