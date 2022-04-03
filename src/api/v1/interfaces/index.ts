import { Request, Response, NextFunction } from 'express';
import { Types, UpdateQuery } from 'mongoose';
import { httpMethods } from './types/index';

export interface ILog {
  message: any;
  time: string;
  type: 'info' | 'error' | 'debug';
}

export interface IRoute {
  path: string;
  method: httpMethods;
  handler: (req: Request, res: Response) => Response | Promise<Response>;
  validator?: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response>;
  localMiddleware?: ((
    req: Request,
    res: Response,
    next: NextFunction
  ) => void | Promise<void>)[];
}

// database
export interface IRead<T> {
  findAll: () => Promise<T[]>;
  findById: (id: Types.ObjectId) => Promise<T | null>;
  find: (query: any) => Promise<T[]>;
}

// database
export interface IWrite<T> {
  create: (data: T) => Promise<T>;
  update: (id: Types.ObjectId, data: UpdateQuery<T>) => Promise<T | null>;
  delete: (id: Types.ObjectId) => Promise<T | null>;
}
