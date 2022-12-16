import { Types } from 'mongoose';

import BaseRepository from './base/BaseRepository';
import { User } from '../models';
import { IUser } from '../interfaces/models';

export default class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }
}
