import {CustomError} from './customerror';
export class DatabaseConnectionError extends CustomError{
  statusCode = 500;
  reason = 'Error connecting to database';
  constructor(){
    super('Error connecting to database');
    //only because we are extending a base class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors(){
    return [{message: this.reason}];
  }
}