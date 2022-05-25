import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';

import HttpController from './base/HttpController';
import { UserService } from '../services';
import { httpMethods } from '../interfaces/types';
import { UserQuery } from '../interfaces';
import { userSchema } from '../validators';
import { validate } from '../middlewares';

const usersrv = new UserService();

// TODO: implement regex username search
export default class UserController extends HttpController {
  path = '/users';

  routes = [
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
      // ! check optional -> checkFalsy
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
    }
  ];

  // query[username] returns ONE document
  private async getUsers(req: Request, res: Response): Promise<Response> {
    const {
      username,
      sort_by: sort,
      fields
    } = req.query as unknown as UserQuery;

    const [user, error] = username
      ? await usersrv.getByUsername(username, sort, fields)
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
}
