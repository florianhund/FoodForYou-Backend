export default class HttpError extends Error {
  constructor(
    private _message = 'Something went wrong.',
    private _code = 500,
    private _status = 'INTERNAL SERVER ERROR'
  ) {
    super(_message);
  }

  get message(): string {
    return this._message;
  }

  get code(): number {
    return this._code;
  }

  get status(): string {
    return this._status;
  }
}
