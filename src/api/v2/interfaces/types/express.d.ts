/* eslint-disable @typescript-eslint/no-empty-interface */

import { IUser } from '../models';

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
