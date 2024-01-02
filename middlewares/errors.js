import { NODE_ENV } from '../config/environments.js';
import Log from '../utils/logger.js';
const __DEV__ = NODE_ENV === 'development';

// Error handling Middleware functions
export const errorLogger = (error, _request, _response, next) => {
  console.log('========== IN ERROR LOGGER ==========');
  Log.error(`ERROR: ${error.message}`);
  next(error); // calling next middleware
};

export const errorResponder = (error, _request, response, next) => {
  console.log('========== IN ERROR RESPONDER ==========');
  response.header('Content-Type', 'application/json');

  if (__DEV__) {
    console.error(error);
  }
  const status = error.status;
  const type = error.type;
  const data = type === 'validation' ? error.message.split(',') : error.message;
  response.status(status).send(data);
};

export const invalidPathHandler = (_request, response, next) => {
  response.status(400);
  response.send('invalid path');
};
