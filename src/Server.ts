import http from 'http';
import express, { Application, RequestHandler } from 'express';
import * as swaggerUi from 'swagger-ui-express';

import router, { defaultHandler } from './api/v1/routes';
import Logger from './config/Logger';
import docs from './config/docs';

const logger = new Logger(__filename);

export default class Server {
  // eslint-disable-next-line no-use-before-define
  private static _server: Server;

  private _app: Application = express();

  private constructor(private readonly _port: number) {}

  public static instantiate(port: number): Server {
    if (!Server._server) {
      Server._server = new Server(port);
    }
    return Server._server;
  }

  get app(): Application {
    return this._app;
  }

  public run(): http.Server {
    return this._app.listen(this._port, () => {
      logger.log(`Server running on port ${this._port}!`, 'info');
    });
  }

  public loadGlobalMiddleware(middleware: RequestHandler[]): Server {
    middleware.forEach(mw => {
      this._app.use(mw);
    });
    return this;
  }

  public setGlobalSettings(variables: { [name: string]: string }[]): Server {
    variables.forEach(object => {
      const [key]: string[] = Object.keys(object);
      this._app.set(key, object[0]);
    });
    return this;
  }

  public loadControllers(): Server {
    this._app.use('/api/v1', router);
    this._app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));
    this._app.use('*', defaultHandler);
    return this;
  }
}
