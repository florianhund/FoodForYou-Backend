import { ConnectOptions } from 'mongoose';
import express from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';

import { PORT, DATABASE_URL, COOKIE_KEY } from './config/constants';
import Database from './config/Database';
import Server from './Server';
import initializePassport from './config/passport';

const server: Server = Server.instantiate(PORT);
const database: Database = new Database(DATABASE_URL, {
  useNewUrlParser: true
} as ConnectOptions);

initializePassport(passport);

const middleware = [
  cookieSession({
    maxAge: 10 * 60 * 60 * 1000,
    keys: [COOKIE_KEY as string]
  }),
  express.urlencoded({ extended: false }),
  express.json(),
  passport.initialize(),
  passport.session()
];

database.init().then(() => {
  server.loadGlobalMiddleware(middleware).loadControllers().run();
});
