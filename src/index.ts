import { ConnectOptions } from 'mongoose';
import express from 'express';
import passport from 'passport';
import session from 'express-session';

import { PORT, DATABASE_URL, COOKIE_KEY } from './config/constants';
import Database from './config/Database';
import Server from './Server';
import { initializePassport } from './api/v2/lib';

const server: Server = Server.instantiate(PORT);
const database: Database = new Database(DATABASE_URL, {
  useNewUrlParser: true
} as ConnectOptions);

initializePassport(passport);

const middleware = [
  session({
    secret: COOKIE_KEY!,
    resave: false,
    saveUninitialized: false
  }),
  express.urlencoded({ extended: false }),
  express.json(),
  passport.initialize(),
  passport.session()
];

database.init().then(() => {
  server.loadGlobalMiddleware(middleware).loadControllers().run();
});
