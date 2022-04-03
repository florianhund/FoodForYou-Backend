import { Request, Response, NextFunction, Router } from 'express';
import { IRoute } from '../../interfaces';
import ValidationError from '../../utils/ValidationError';

export default abstract class HttpController {
  public abstract path: string;

  public abstract routes: IRoute[];

  private router = Router();

  public setRoutes(): Router {
    this.routes.forEach(route => {
      if (route.localMiddleware) {
        route.localMiddleware.forEach(mw => {
          this.router.use(route.path, mw);
        });
      }
      this.router[route.method](
        route.path,
        route.validator ||
          ((req: Request, res: Response, next: NextFunction) => next()),
        route.handler
      );
    });
    return this.router;
  }

  protected sendSuccess(res: Response, data: any, status?: number): Response {
    if (status === 201 || status === 204) return res.status(status).send();
    return res.status(status || 200).json({ data });
  }

  protected sendError(
    res: Response,
    err: ValidationError = new ValidationError()
  ): Response {
    return res.status(err.code).json({ message: err.message });
  }
}
