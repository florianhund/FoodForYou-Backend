import { Request, Response, NextFunction } from 'express';
import { IHttpError } from '..';

export enum HttpMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
  HEAD = 'head',
  OPTIONS = 'options',
  TRACE = 'trace',
  CONNECT = 'connect'
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

export type PromiseHandler<T> = Promise<[T | null, IHttpError | undefined]>;

// export type MealTag =
//   | 'Fast Food'
//   | 'Burger'
//   | 'Pizza'
//   | 'Asian'
//   | 'Dessert'
//   | 'Breakfast'
//   | 'Vegetarian'
//   | 'Vegan'
//   | 'Mexican';
export enum MealTag {
  FAST_FOOD = 'Fast Food',
  BURGER = 'Burger',
  PIZZA = 'Pizza',
  ASIAN = 'Asian',
  DESSERT = 'Dessert',
  BREAKFAST = 'Breakfast',
  VEGETARIAN = 'Vegetarian',
  VEGAN = 'Vegan',
  MEXICAN = 'Mexican',
  ITALIAN = 'Italian'
}

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Response | Promise<void | Response>;

export type UserProvider = 'email' | 'google' | 'facebook';
