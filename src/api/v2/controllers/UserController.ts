import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';

import HttpController from './base/HttpController';
import { httpMethods } from '../interfaces/types';
import { UserQuery, IRoute } from '../interfaces';
import { userSchema } from '../validators';
import { checkUser, validate } from '../middlewares';
import HttpError from '../utils/HttpError';
import UserService from '../services/UserService';

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

  constructor(private _usersrv: UserService) {
    super();
    super.bindHandlers(this);
  }

  // query.username returns ONE document
  private async getUsers(req: Request, res: Response): Promise<Response> {
    const { email, sort_by: sort, fields } = req.query as unknown as UserQuery;

    const [users, error] = email
      ? await this._usersrv.getByEmail(email, fields)
      : await this._usersrv.getAll(sort, fields);

    if (!users) return super.sendError(res, error);
    return super.sendSuccess(res, users);
  }

  private async createUser(req: Request, res: Response): Promise<Response> {
    const [user, error] = await this._usersrv.create(req.body);
    if (!user) return super.sendError(res, error);
    res.setHeader('Location', `/users/${user._id}`);
    return super.sendSuccess(res, {}, 201);
  }

  private async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { fields } = req.query as unknown as UserQuery;
    const [user, error] = await this._usersrv.getById(id, fields);
    if (!user) return super.sendError(res, error);
    return super.sendSuccess(res, user);
  }

  private async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [user, error] = await this._usersrv.update(id, req.body);
    if (!user) return super.sendError(res, error);
    return super.sendSuccess(res, {}, 204);
  }

  private async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [user, error] = await this._usersrv.delete(id);
    if (!user) return super.sendError(res, error);
    return super.sendSuccess(res, {}, 204);
  }

  private async sendVerification(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;
    const [success, error] = await this._usersrv.sendVerificationMail(id);
    if (!success) return super.sendError(res, error);
    return super.sendSuccess(res, {}, 204);
  }

  private async verifyUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { otp } = req.query as Record<string, string>;
    const [success, error] = await this._usersrv.verifiyUser(id, otp);
    if (!success) return super.sendError(res, error);
    return super.sendSuccess(res, {}, 204);
  }
}
