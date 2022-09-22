import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';

import { IRoute, RestaurantQuery } from '../interfaces';
import { httpMethods } from '../interfaces/types';
import { validate } from '../middlewares';
import { restaurantSchema } from '../validators';
import RestaurantService from '../services/RestaurantService';
import { hasAllNullishValues } from '../utils';
import HttpController from './base/HttpController';

export default class RestaurantController extends HttpController {
  path = '/restaurants';

  routes: IRoute[] = [
    {
      path: '/',
      method: httpMethods.GET,
      handler: this.getRestaurants,
      validator: validate(checkSchema(restaurantSchema.get))
    },
    {
      path: '/',
      method: httpMethods.POST,
      handler: this.createRestaurant,
      validator: validate(checkSchema(restaurantSchema.create))
    },
    {
      path: '/:id',
      method: httpMethods.GET,
      handler: this.getRestaurantById,
      validator: validate(checkSchema(restaurantSchema.id))
    },
    {
      path: '/:id',
      method: httpMethods.PATCH,
      handler: this.updateRestaurant,
      validator: validate(
        checkSchema({ ...restaurantSchema.id, ...restaurantSchema.update })
      )
    },
    {
      path: '/:id',
      method: httpMethods.DELETE,
      handler: this.deleteRestaurant,
      validator: validate(checkSchema(restaurantSchema.id))
    }
  ];

  constructor(private _restSrv: RestaurantService) {
    super();
    super.bindHandlers(this);
  }

  private async getRestaurants(req: Request, res: Response) {
    const {
      sort_by: sort,
      min_rating: minRating,
      fields,
      name,
      address,
      postal_code: postalCode
    } = req.query as unknown as RestaurantQuery;

    const filter = {
      minRating,
      name,
      address,
      postalCode
    };

    const [restaurant, error] = !hasAllNullishValues(filter)
      ? await this._restSrv.get(filter, sort, fields)
      : await this._restSrv.getAll(sort, fields);

    if (!restaurant) return super.sendError(res, error);
    return super.sendSuccess(res, restaurant);
  }

  private async getRestaurantById(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;
    const { fields } = req.query as unknown as Record<string, string>;
    const [restaurant, error] = await this._restSrv.getById(id, fields);
    if (!restaurant) return super.sendError(res, error);
    return super.sendSuccess(res, restaurant);
  }

  private async createRestaurant(req: Request, res: Response) {
    const [restaurant, error] = await this._restSrv.create(req.body);
    if (!restaurant) return super.sendError(res, error);
    res.setHeader('Location', `/users/${restaurant._id}`);
    return super.sendSuccess(res, {}, 201);
  }

  private async updateRestaurant(req: Request, res: Response) {
    const { id } = req.params;
    const [restaurant, error] = await this._restSrv.update(id, req.body);
    if (!restaurant) return super.sendError(res, error);
    return super.sendSuccess(res, {}, 204);
  }

  private async deleteRestaurant(req: Request, res: Response) {
    const { id } = req.params;
    const [restaurant, error] = await this._restSrv.delete(id);
    if (!restaurant) return super.sendError(res, error);
    return super.sendSuccess(res, {}, 204);
  }
}
