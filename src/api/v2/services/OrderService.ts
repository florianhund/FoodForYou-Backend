import { UpdateQuery } from 'mongoose';
import { OrderFilterQuery, OrderSearchQuery } from '../interfaces';

import { IOrder } from '../interfaces/models';
import { PromiseHandler } from '../interfaces/types';
import OrderRepository from '../repositories/OrderRepository';
import HttpError from '../utils/HttpError';

export default class OrderService {
  constructor(private _repo: OrderRepository) {}

  public async getAll(
    sort?: string,
    fields?: string
  ): PromiseHandler<IOrder[]> {
    try {
      const orders = await this._repo.findAll(sort || '', fields?.split(','));
      return [orders, undefined];
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

  public async getById(id: string, fields?: string): PromiseHandler<IOrder> {
    const objectId = OrderRepository.createIdFromString(id);
    try {
      const order = await this._repo.findById(objectId, fields?.split(','));
      if (!order)
        return [
          null,
          new HttpError(
            'Order with specified id was not found.',
            404,
            'INVALID ID'
          )
        ];
      return [order, undefined];
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

  public async get(
    {
      orderedMeals,
      userId,
      minPrice,
      maxPrice,
      postalCode,
      address,
      isPaid,
      before,
      after
    }: OrderSearchQuery,
    sortQuery?: string,
    fields?: string
  ): PromiseHandler<IOrder[]> {
    const filterQuery: OrderFilterQuery = {
      address: new RegExp(address || '', 'i'),
      totalPrice: {
        $gte: minPrice || 0,
        $lte: maxPrice || 1000
      },
      meals: { $in: orderedMeals?.split(',') || [] }
    };

    if (postalCode) filterQuery.postalCode = +postalCode;
    if (userId) filterQuery.userId = userId;
    if (isPaid != null) filterQuery.isPaid = isPaid;
    if (before || after) {
      filterQuery.orderTime = {};

      // ! before behaves like -lt
      if (before) filterQuery.orderTime.$lte = new Date(before);
      if (after) filterQuery.orderTime.$gte = new Date(after);
    }

    try {
      const orders = await this._repo.find(
        filterQuery,
        sortQuery || '',
        fields?.split(',')
      );
      return [orders, undefined];
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

  public async create(data: IOrder): PromiseHandler<IOrder> {
    try {
      const order = await this._repo.create({
        address: data.address,
        postalCode: data.postalCode,
        user: data.user,
        meals: data.meals
      } as IOrder);
      return [order, undefined];
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
    data: UpdateQuery<IOrder>
  ): PromiseHandler<IOrder> {
    const objectId = OrderRepository.createIdFromString(id);
    try {
      const order = await this._repo.update(objectId, data);
      if (!order)
        return [
          null,
          new HttpError(
            'Order with specified id was not found.',
            404,
            'INVALID ID'
          )
        ];
      return [order, undefined];
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

  public async delete(id: string): PromiseHandler<IOrder> {
    const objectId = OrderRepository.createIdFromString(id);
    try {
      const order = await this._repo.delete(objectId);
      if (!order)
        return [
          null,
          new HttpError(
            'Order with specified id was not found.',
            404,
            'INVALID ID'
          )
        ];
      return [order, undefined];
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
}
