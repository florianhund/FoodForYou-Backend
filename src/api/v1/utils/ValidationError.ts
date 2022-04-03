export default class ValidationError extends Error {
  constructor(
    private _message: string = 'Internal Server Error',
    private _code: number = 500
  ) {
    super(_message);
  }

  get message(): string {
    return this._message;
  }

  get code(): number {
    return this._code;
  }
}
