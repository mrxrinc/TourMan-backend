import bodyParser from 'body-parser';
import express from 'express';

import { errorResponder, errorLogger, invalidPathHandler } from './errors.js';
import requestLogger from './requestLogger.js';

export function applyPriorMiddlewares(app) {
  app.use('/uploads', express.static('uploads')); // access permission
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(requestLogger);
}

export function applyErrorHandlingMiddlewares(app) {
  app.use(errorLogger);
  app.use(errorResponder);
  app.use(invalidPathHandler);
}
