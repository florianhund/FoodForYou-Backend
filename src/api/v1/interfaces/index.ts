import { Request, RequestHandler, Response } from 'express';
import { Types, UpdateQuery } from 'mongoose';
import http from 'http';

import { httpMethods, middleware, MongooseOrder } from './types';

export interface ILog {
  message: any;
  time: string;
  type: 'info' | 'error' | 'debug';
}

export interface IRoute {
  path: string;
  method: httpMethods;
  handler: (
    req: Request,
    res: Response
  ) => Response | void | Promise<Response | void>;
  validator?: middleware;
  localMiddleware?: middleware[];
}

export interface IServer {
  loadControllers(): any;
  loadGlobalMiddleware(middleware: RequestHandler[]): any;
  run(): http.Server;
}

export interface IRead<T> {
  findAll: (order?: MongooseOrder[]) => Promise<T[]>;
  findById: (id: Types.ObjectId) => Promise<T | null>;
  find: (query: any, order?: MongooseOrder[]) => Promise<T[]>;
}

export interface IWrite<T> {
  create: (data: T) => Promise<T>;
  update: (id: Types.ObjectId, data: UpdateQuery<T>) => Promise<T | null>;
  delete: (id: Types.ObjectId) => Promise<T | null>;
}

export interface MealQuery {
  name?: string;
  min_price?: number;
  max_price?: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
  without_allergenics?: string;
  sort_by?: string;
  tags?: string;
  fields?: string;
}

export interface MealSearchQuery {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
  allergenics?: string;
  tags?: string;
}

export interface MealFilterQuery {
  price: {
    $gte: number;
    $lte: number;
  };
  name: RegExp;
  allergenics: {
    $not: {
      $in: string[];
    };
  };
  tags?: {
    $in: string[];
  };
  isVegetarian?: boolean | null;
  isVegan?: boolean;
}

export interface UserQuery {
  email?: string;
  sort_by?: string;
  fields?: string;
}
