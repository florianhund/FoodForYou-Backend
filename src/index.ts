import { ConnectOptions } from 'mongoose';
import express from 'express';

import { PORT, DATABASE_URL } from './config/constants';
import Database from './config/Database';
import Server from './Server';

const server: Server = Server.instantiate(PORT);
const database: Database = new Database(DATABASE_URL, {
  useNewUrlParser: true
} as ConnectOptions);

const middleware = [express.urlencoded({ extended: false }), express.json()];

database.init().then(() => {
  server.loadGlobalMiddleware(middleware).loadControllers().run();
});
