import express, { Application } from 'express';
import session from 'express-session';
import passport from 'passport';
import request from 'supertest';
import { initializePassport } from '../../src/api/v2/lib';
import { COOKIE_KEY } from '../../src/config/constants';

import Server from '../../src/Server';

export default class SuperTest {
  constructor(private _baseUrl: string) {
    this._initializeServer();
  }

  private _server!: Server;

  private _app!: Application;

  private _initializeServer() {
    initializePassport(passport);
    this._server = Server.instantiate(3000);
    this._server
      .loadGlobalMiddleware([
        session({
          secret: COOKIE_KEY!,
          resave: false,
          saveUninitialized: false
        }),
        express.urlencoded({ extended: false }),
        express.json(),
        passport.initialize(),
        passport.session()
      ])
      .loadControllers();
    this._app = this._server.app;
  }

  public get(url: string) {
    return request(this._app).get(`${this._baseUrl}${url}`);
  }

  get app() {
    return this._app;
  }

  public post(url: string, body: any) {
    return request(this._app)
      .post(`${this._baseUrl}${url}`)
      .set('Content-Type', 'Application/json')
      .send(body || {});
  }

  public patch(url: string, body: any) {
    return request(this._app)
      .patch(`${this._baseUrl}${url}`)
      .set('Content-Type', 'Application/json')
      .send(body || {});
  }

  public delete(url: string) {
    return request(this._app).delete(`${this._baseUrl}${url}`);
  }
}
