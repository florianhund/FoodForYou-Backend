import ValidationError from '../../utils/ValidationError';

export enum httpMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}

export enum Allergenics {
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  L,
  M,
  N,
  O,
  P,
  R
}

export type PromiseHandler<T> = Promise<
  [T | null, ValidationError | undefined]
>;
