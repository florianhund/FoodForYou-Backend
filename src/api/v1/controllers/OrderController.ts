import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import { IRoute, OrderQuery } from '../interfaces';
import { httpMethods } from '../interfaces/types';
import { validate } from '../middlewares';
import OrderService from '../services/OrderService';
import { hasAllNullishValues } from '../utils';
import { orderSchema } from '../validators';
import HttpController from './base/HttpController';

export default class OrderController extends HttpController {
  path = '/orders';

  routes: IRoute[] = [
    {
      path: '/',
      method: httpMethods.GET,
      handler: this.getOrders,
      validator: validate(checkSchema(orderSchema.get))
    },
    {
      path: '/',
      method: httpMethods.POST,
      handler: this.createOrder,
      validator: validate(checkSchema(orderSchema.create))
    },
    {
      path: '/:id',
      method: httpMethods.GET,
      handler: this.getOrderById,
      validator: validate(checkSchema(orderSchema.id))
    },
    {
      path: '/:id',
      method: httpMethods.PATCH,
      handler: this.updateOrder,
      validator: validate(
        checkSchema({ ...orderSchema.update, ...orderSchema.id })
      )
    },
    {
      path: '/:id',
      method: httpMethods.DELETE,
      handler: this.deleteOrder,
      validator: validate(checkSchema(orderSchema.id))
    }
  ];

  constructor(private _ordersrv: OrderService) {
    super();
    super.bindHandlers(this);
  }

  private async getOrders(req: Request, res: Response): Promise<Response> {
    const {
      sort_by: sort,
      fields,
      ordered_meals_ids: orderedMeals,
      user_id: userId,
      min_price: minPrice,
      max_price: maxPrice,
      postal_code: postalCode,
      address,
      isPaid,
      before,
      after
    } = req.query as unknown as OrderQuery;

    const filter = {
      orderedMeals,
      userId,
      minPrice,
      maxPrice,
      postalCode,
      address,
      isPaid,
      before,
      after
    };

    const [order, error] = !hasAllNullishValues(filter)
      ? await this._ordersrv.get(filter, sort, fields)
      : await this._ordersrv.getAll(sort, fields);

    if (!order) return super.sendError(res, error);
    return super.sendSuccess(res, order);
  }

  private async createOrder(req: Request, res: Response): Promise<Response> {
    const [user, error] = await this._ordersrv.create(req.body);
    if (!user) return super.sendError(res, error);
    res.setHeader('Location', `/users/${user._id}`);
    return super.sendSuccess(res, {}, 201);
  }

  private async getOrderById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { fields } = req.query as unknown as OrderQuery;
    const [user, error] = await this._ordersrv.getById(id, fields);
    if (!user) return super.sendError(res, error);
    return super.sendSuccess(res, user);
  }

  private async updateOrder(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [user, error] = await this._ordersrv.update(id, req.body);
    if (!user) return super.sendError(res, error);
    return super.sendSuccess(res, {}, 204);
  }

  private async deleteOrder(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [user, error] = await this._ordersrv.delete(id);
    if (!user) return super.sendError(res, error);
    return super.sendSuccess(res, {}, 204);
  }
}
