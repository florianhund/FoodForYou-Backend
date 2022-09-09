import { UpdateQuery } from 'mongoose';
import bcrypt from 'bcrypt';

import { IUser } from '../interfaces/models';
import { PromiseHandler } from '../interfaces/types';
import HttpError from '../utils/HttpError';
import { User } from '../models';
import UserRepository from '../repositories/UserRepository';

export default class UserService {
  constructor(private _repo: UserRepository) {}

  public async getAll(sort?: string, fields?: string): PromiseHandler<IUser[]> {
    try {
      const users = await this._repo.findAll(sort || '', fields?.split(','));

      return [users, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }

  public async getById(id: string, fields?: string): PromiseHandler<IUser> {
    const objectId = UserRepository.createIdFromString(id);
    try {
      const user = await this._repo.findById(objectId, fields?.split(','));
      if (!user)
        return [
          null,
          new HttpError(
            'User with specified id was not found.',
            404,
            'INVALID ID'
          )
        ];
      return [user, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }

  public async getByEmail(
    email: string,
    fields?: string
  ): PromiseHandler<IUser> {
    try {
      const [user] = await this._repo.find({ email }, '', fields?.split(','));
      if (!user)
        return [
          null,
          new HttpError(
            'User with specified id was not found.',
            404,
            'INVALID ID'
          )
        ];
      return [user, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }

  public async create(data: IUser): PromiseHandler<IUser> {
    const hashedPassword = await bcrypt.hash(data.password!, 10);
    const otp = Math.floor(Math.random() * 9000) + 1000;
    const user = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      provider: 'email',
      isVerified: false,
      isAdmin: false,
      otp
    });
    user.providerId = user._id;

    try {
      const newUser = await user.save();
      return [newUser, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }

  public async update(
    id: string,
    data: UpdateQuery<IUser>
  ): PromiseHandler<IUser> {
    const objectId = UserRepository.createIdFromString(id);
    try {
      const user = await this._repo.update(objectId, data);
      if (!user)
        return [
          null,
          new HttpError(
            'User with specified id was not found.',
            404,
            'INVALID ID'
          )
        ];
      return [user, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }

  public async delete(id: string): PromiseHandler<IUser> {
    const objectId = UserRepository.createIdFromString(id);
    try {
      const user = await this._repo.delete(objectId);
      if (!user)
        return [
          null,
          new HttpError(
            'User with specified id was not found.',
            404,
            'INVALID ID'
          )
        ];
      return [user, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }
}
