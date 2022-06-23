import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';

import HttpController from './base/HttpController';
import { UserService } from '../services';
import { httpMethods } from '../interfaces/types';
import { UserQuery, IRoute } from '../interfaces';
import { userSchema } from '../validators';
import { checkUser, validate } from '../middlewares';
import Mailer from '../../../config/Mailer';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN
} from '../../../config/constants';
import HttpError from '../utils/HttpError';

const usersrv = new UserService();

// TODO: implement regex username search
export default class UserController extends HttpController {
  path = '/users';

  routes: IRoute[] = [
    {
      path: '/',
      method: httpMethods.GET,
      handler: this.getUsers
    },
    {
      path: '/',
      method: httpMethods.POST,
      handler: this.createUser,
      validator: validate(checkSchema(userSchema.create))
      // ? check optional -> checkFalsy
    },
    {
      path: '/:id',
      method: httpMethods.GET,
      handler: this.getUserById,
      validator: validate(checkSchema(userSchema.id))
    },
    {
      path: '/:id',
      method: httpMethods.PATCH,
      handler: this.updateUser,
      validator: validate(
        checkSchema({ ...userSchema.id, ...userSchema.update })
      )
    },
    {
      path: '/:id',
      method: httpMethods.DELETE,
      handler: this.deleteUser,
      validator: validate(checkSchema(userSchema.id))
    },
    {
      path: '/:id/send-verification',
      method: httpMethods.GET,
      localMiddleware: [checkUser.isNotVerified],
      handler: this.sendVerification
    },
    {
      path: '/:id/verify',
      method: httpMethods.GET,
      localMiddleware: [checkUser.isNotVerified],
      handler: this.verifyUser,
      validator: validate(
        checkSchema({ ...userSchema.id, ...userSchema.verification })
      )
    }
  ];

  // query.username returns ONE document
  private async getUsers(req: Request, res: Response): Promise<Response> {
    const { email, sort_by: sort, fields } = req.query as unknown as UserQuery;

    const [user, error] = email
      ? await usersrv.getByEmail(email, fields)
      : await usersrv.getAll(sort, fields);

    if (!user) return super.sendError(res, error);
    return super.sendSuccess(res, user);
  }

  private async createUser(req: Request, res: Response): Promise<Response> {
    const [user, error] = await usersrv.create(req.body);
    if (!user) return super.sendError(res, error);
    res.setHeader('Location', `/users/${user._id}`);
    return super.sendSuccess(res, {}, 201);
  }

  private async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { fields } = req.query as unknown as UserQuery;
    const [user, error] = await usersrv.getById(id, fields);
    if (!user) return super.sendError(res, error);
    return super.sendSuccess(res, user);
  }

  private async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [user, error] = await usersrv.update(id, req.body);
    if (!user) return super.sendError(res, error);
    return super.sendSuccess(res, {}, 204);
  }

  private async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [user, error] = await usersrv.delete(id);
    if (!user) return super.sendError(res, error);
    return super.sendSuccess(res, {}, 204);
  }

  private async sendVerification(
    req: Request,
    res: Response
  ): Promise<Response> {
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN)
      throw new Error(
        'Either Client id, client secret or refresh token is null'
      );
    const mailer = new Mailer(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REFRESH_TOKEN
    );

    const [user, error] = await usersrv.getById(req.params.id);
    if (!user) return super.sendError(res, error);

    // eslint-disable-next-line
    mailer.sendVerification(user.email, user.otp!);
    return super.sendSuccess(res, {}, 204);
  }

  private async verifyUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { otp } = req.query;

    const [user, error] = await usersrv.getById(id);
    if (!user) return super.sendError(res, error);

    if (+otp! !== user.otp)
      return super.sendError(res, new HttpError('wrong code', 401));
    await usersrv.update(id, { isVerified: true, otp: null });
    return super.sendSuccess(res, {}, 204);
  }
}
