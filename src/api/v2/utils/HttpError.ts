import { IHttpError } from '../interfaces/types';

export default class HttpError extends Error implements IHttpError {
  private _stack: string | undefined;

  constructor(
    private _message: string,
    private _statusCode: number,
    private _statusMessage: string,
    private _isOperational = true,
    stack = ''
  ) {
    super(_message);
    if (stack) {
      this._stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  get message() {
    return this._message;
  }

  get statusCode() {
    return this._statusCode;
  }

  get statusMessage() {
    return this._statusMessage;
  }

  get isOperational() {
    return this._isOperational;
  }

  get stack() {
    return this._stack;
  }
}
