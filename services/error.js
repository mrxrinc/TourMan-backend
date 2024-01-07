export class BaseError extends Error {
  constructor(message, params) {
    super(message);
    this.status = params?.status || 400;
    this.type = params?.type || 'unknown';
  }
}

export default BaseError;
