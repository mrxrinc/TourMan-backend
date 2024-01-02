import { NODE_ENV } from '../config/environments.js';
import Log from '../utils/logger.js';
import { VALIDATION } from '../utils/validations.js';
const __DEV__ = NODE_ENV === 'development';

export const errorLogger = (error, _request, _response, next) => {
  if (__DEV__) {
    console.error(error);
  }
  Log.error(`ERROR: ${error.message}`);
  next(error);
};

export const errorResponder = (error, _request, response, next) => {
  console.log('========== ERROR RESPONDER ==========');
  response.header('Content-Type', 'application/json');

  const status = error.status;
  const type = error.type;
  const data = type === VALIDATION ? error.message.split(',') : error.message;
  response.status(status).send(data);
};

export const invalidPathHandler = (_request, response, next) => {
  response.status(400).send('invalid path');
};
