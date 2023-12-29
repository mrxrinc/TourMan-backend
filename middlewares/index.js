import express from 'express';
import bodyParser from 'body-parser';
import { requestLogger } from './logger.js';
import { errorResponder, errorLogger, invalidPathHandler } from './errors.js';

export function applyMiddlewares(app) {
  app.use('/uploads', express.static('uploads')); // access permission
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(requestLogger);
  app.use(errorLogger);
  app.use(errorResponder);
  //   app.use(invalidPathHandler);
}
