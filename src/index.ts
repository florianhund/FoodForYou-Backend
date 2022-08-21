import { ConnectOptions } from 'mongoose';
import express from 'express';
import passport from 'passport';
import session from 'express-session';

import { PORT, DATABASE_URL, COOKIE_KEY } from './config/constants';
import Database from './config/Database';
import Server from './Server';
import initialize from './config/passport';

const server: Server = Server.instantiate(PORT);
const database: Database = new Database(DATABASE_URL, {
  useNewUrlParser: true
} as ConnectOptions);

initialize(passport);

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
