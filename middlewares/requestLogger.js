import Log from '../utils/logger.js';
export default function (request, _response, next) {
  Log.info(`REQUEST: ${request.method} --- PATH: ${request.url}`);
  next();
}
