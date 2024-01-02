export class BaseError extends Error {
  constructor(message, params) {
    super(message);
    this.status = params?.status || 400;
    this.type = params?.type || 'unknown';
    this.params = params || {};
  }
}

export default BaseError;
