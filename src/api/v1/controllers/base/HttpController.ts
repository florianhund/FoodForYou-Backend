import { Response, Router } from 'express';
import { IRoute } from '../../interfaces';

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

  protected sendSuccess(res: Response, data: unknown, status?: number) {
    res.status(status || 200).json({ data });
  }

  protected sendError(res: Response, status?: number, message?: string): void {
    res
      .status(status || 500)
      .json({ message: message || 'Internal Server Error' });
  }
}
