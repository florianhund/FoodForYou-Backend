/* eslint-disable no-unused-vars */

import mongoose, { ConnectOptions } from 'mongoose';
import Logger from './Logger';

const logger = new Logger(__filename);

export default class Database {
  constructor(
    private readonly _connectionUrl: string,
    public options: ConnectOptions
  ) {}

  public async initialize(): Promise<void> {
    try {
      await mongoose.connect(this._connectionUrl, this.options);
      logger.log('Connected to Mongoose!', 'info');
    } catch (err) {
      logger.log(err as string, 'error');
      process.exit(1);
    }
  }
}
