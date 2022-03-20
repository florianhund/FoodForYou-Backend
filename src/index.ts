import { ConnectOptions } from 'mongoose';

import { PORT, DATABASE_URL } from './config/constants';
import Database from './config/Database';
import Server from './Server';

const server: Server = Server.instantiate(PORT);
const database: Database = new Database(DATABASE_URL, {
  useNewUrlParser: true
} as ConnectOptions);

database.initialize().then(() => {
  server.loadGlobalVariables([]);
  server.loadGlobalMiddleware([]);
  server.loadControllers();
  server.run();
});
