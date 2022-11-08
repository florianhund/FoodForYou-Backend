import { Types, UpdateQuery } from 'mongoose';
import bcrypt from 'bcrypt';

import { IUser } from '../interfaces/models';
import { PromiseHandler } from '../interfaces/types';
import HttpError from '../utils/HttpError';
import UserRepository from '../repositories/UserRepository';
import Mailer from '../../../config/Mailer';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN
} from '../../../config/constants';
import { IHttpError } from '../interfaces';

export default class UserService {
  constructor(private _repo: UserRepository) {}

  public async getAll(sort?: string, fields?: string): PromiseHandler<IUser[]> {
    try {
      const users = await this._repo.findAll(sort || '', fields?.split(','));

      return [users, undefined];
    } catch (err) {
      return [
        null,
        new HttpError(
          'Oops, something went wrong!',
          500,
          'INTERNAL_SERVER_ERROR'
        )
      ];
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
      return [
        null,
        new HttpError(
          'Oops, something went wrong!',
          500,
          'INTERNAL_SERVER_ERROR'
        )
      ];
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
      return [
        null,
        new HttpError(
          'Oops, something went wrong!',
          500,
          'INTERNAL_SERVER_ERROR'
        )
      ];
    }
  }

  public async create(data: IUser): PromiseHandler<IUser> {
    const hashedPassword = await bcrypt.hash(data.password!, 10);
    const otp = Math.floor(Math.random() * 9000) + 1000;
    const id = new Types.ObjectId();
    try {
      const user = await this._repo.create({
        _id: id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        provider: 'email',
        providerId: id.toString(),
        isVerified: false,
        isAdmin: false,
        otp
      } as IUser);
      return [user, undefined];
    } catch (err) {
      return [
        null,
        new HttpError(
          'Oops, something went wrong!',
          500,
          'INTERNAL_SERVER_ERROR'
        )
      ];
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
      return [
        null,
        new HttpError(
          'Oops, something went wrong!',
          500,
          'INTERNAL_SERVER_ERROR'
        )
      ];
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
      return [
        null,
        new HttpError(
          'Oops, something went wrong!',
          500,
          'INTERNAL_SERVER_ERROR'
        )
      ];
    }
  }

  public async sendVerificationMail(userId: string): PromiseHandler<boolean> {
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN)
      throw new Error(
        'Either Client id, client secret or refresh token is null'
      );

    const mailer = new Mailer(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REFRESH_TOKEN
    );

    try {
      const [user, error] = await this.getById(userId);
      if (!user) return [false, error];
      mailer.sendVerification(user.email, user.otp!);
    } catch (err: any) {
      return [false, err[1] as IHttpError];
    }

    return [true, undefined];
  }

  public async verifiyUser(
    userId: string,
    otp: string
  ): PromiseHandler<boolean> {
    try {
      const [user, error] = await this.getById(userId);
      if (!user) return [false, error];

      if (+otp! !== user.otp)
        return [false, new HttpError('wrong code', 401, 'UNAUTHENTIICATED')];

      await this.update(userId, { isVerified: true, otp: null });
    } catch (err: any) {
      return [false, err[1] as IHttpError];
    }

    return [true, undefined];
  }
}
