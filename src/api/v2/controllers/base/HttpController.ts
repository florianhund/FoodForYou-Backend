import { Request, Response, NextFunction, Router } from 'express';

import { IRoute, IHttpError } from '../../interfaces';
import HttpError from '../../utils/HttpError';

export default abstract class HttpController {
  public abstract path: string;

  public abstract routes: IRoute[];

  private _router = Router();

  public setRoutes() {
    this.routes.forEach(route => {
      if (route.localMiddleware) {
        route.localMiddleware.forEach(mw => {
          this._router.use(route.path, mw);
        });
      }
      this._router[route.method](
        route.path,
        route.validator ||
          ((req: Request, res: Response, next: NextFunction) => next()),
        route.handler
      );
    });
    return this._router;
  }

  protected sendSuccess(res: Response, data: any, status?: number): Response {
    if (status === 201 || status === 204) return res.sendStatus(status);
    return res.status(status || 200).json({ data });
  }

  protected sendError(
    res: Response,
    err: IHttpError = new HttpError(
      'Oops, something went wrong!',
      500,
      'INTERNAL_SERVER_ERROR'
    )
  ): Response {
    return res.status(err.statusCode).json({
      message: err.message,
      code: err.statusCode,
      status: err.statusMessage
    });
  }

  protected bindHandlers(context: HttpController) {
    this.routes = this.routes.map(route => {
      // eslint-disable-next-line no-param-reassign
      route.handler = route.handler.bind(context);
      return route;
    });
  }
}
