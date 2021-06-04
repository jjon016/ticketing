import { CustomError } from './customerror';
export class ForbiddenError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Forbidden request');
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Forbidden request' }];
  }
}
