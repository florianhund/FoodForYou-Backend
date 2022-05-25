export default class ValidationError extends Error {
  constructor(private _message = 'Internal Server Error', private _code = 500) {
    super(_message);
  }

  get message(): string {
    return this._message;
  }

  get code(): number {
    return this._code;
  }
}
