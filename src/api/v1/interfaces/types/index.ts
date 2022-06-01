import { Request, Response, NextFunction } from 'express';
import HttpError from '../../utils/HttpError';

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

export type PromiseHandler<T> = Promise<[T | null, HttpError | undefined]>;

export type MongooseOrder = [string, -1 | 1];

export type middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Response | Promise<void | Response>;
