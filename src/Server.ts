/* eslint-disable no-unused-vars  */

import http from 'http';
import express, { Application, RequestHandler } from 'express';

import router from './api/v1/routes';
import Logger from './config/Logger';

const logger = new Logger(__filename);

export default class Server {
  // eslint-disable-next-line no-use-before-define
  private static _server: Server;

  private _app: Application = express();

  private constructor(private readonly _port: number) {}

  public static instantiate(port: number) {
    if (!Server._server) {
      Server._server = new Server(port);
    }
    return Server._server;
  }

  run(): http.Server {
    return this._app.listen(this._port, () => {
      logger.log(`Server running on port ${this._port}!`, 'info');
    });
  }

  get app() {
    return this._app;
  }

  public loadGlobalMiddleware(middleware: RequestHandler[]): void {
    middleware.forEach(mw => {
      this._app.use(mw);
    });
  }

  public loadGlobalVariables(variables: { [name: string]: string }[]): void {
    variables.forEach(object => {
      const [key]: string[] = Object.keys(object);
      this._app.set(key, object[0]);
    });
  }

  public loadControllers(): void {
    this._app.use('/api/v1', router);
  }
}
