/* eslint-disable no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import { httpMethods } from './types';

export interface IRoute {
  path: string;
  method: httpMethods;
  localMiddleware: ((
    req: Request,
    res: Response,
    next: NextFunction
  ) => void)[];
  handler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void | Promise<void>;
}
