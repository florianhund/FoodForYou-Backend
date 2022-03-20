/* eslint-disable no-unused-vars */

import { Router } from 'express';

import { IRoute } from '../interfaces';

export default abstract class HttpController {
  public abstract path: string;

  public abstract routes: IRoute[];

  private router = Router();

  public setRoutes(): Router {
    this.routes.forEach(route => {
      route.localMiddleware.forEach(mw => {
        this.router.use(route.path, mw);
      });
      this.router[route.method](route.path, route.handler);
    });
    return this.router;
  }
}
