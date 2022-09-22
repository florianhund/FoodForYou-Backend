import { UpdateQuery } from 'mongoose';
import { RestaurantFilterQuery, RestaurantSearchQuery } from '../interfaces';

import { IRestaurant } from '../interfaces/models';
import { PromiseHandler } from '../interfaces/types';
import RestaurantRepository from '../repositories/RestaurantRepository';
import { HttpError } from '../utils';

export default class RestaurantService {
  constructor(private _repo: RestaurantRepository) {}

  public async getAll(
    sortQuery?: string,
    fields?: string
  ): PromiseHandler<IRestaurant[]> {
    try {
      const restaurants = await this._repo.findAll(
        sortQuery?.split(',').join(' ') || '',
        fields?.split(',')
      );
      return [restaurants, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }

  public async getById(
    id: string,
    fields?: string
  ): PromiseHandler<IRestaurant> {
    const objectId = RestaurantRepository.createIdFromString(id);
    try {
      const restaurant = await this._repo.findById(
        objectId,
        fields?.split(',')
      );
      if (!restaurant)
        return [
          null,
          new HttpError(
            'restaurant with specified id was not found.',
            404,
            'INVALID ID'
          )
        ];
      return [restaurant, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }

  public async get(
    { name, minRating, address, postalCode }: RestaurantSearchQuery,
    sortQuery?: string,
    fields?: string
  ): PromiseHandler<IRestaurant[]> {
    const filterQuery: RestaurantFilterQuery = {
      name: new RegExp(name || '', 'i'),
      address: new RegExp(address || '', 'i'),
      rating: {
        $gte: minRating || 0
      }
    };

    if (postalCode) filterQuery.postalCode = postalCode;

    try {
      const restaurants = await this._repo.find(
        filterQuery,
        sortQuery || '',
        fields?.split(',')
      );
      return [restaurants, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }

  public async create(data: IRestaurant): PromiseHandler<IRestaurant> {
    try {
      const restaurant = await this._repo.create(data);
      return [restaurant, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }

  public async update(
    id: string,
    data: UpdateQuery<IRestaurant>
  ): PromiseHandler<IRestaurant> {
    const objectId = RestaurantRepository.createIdFromString(id);
    try {
      const restaurant = await this._repo.update(objectId, data);
      if (!restaurant)
        return [
          null,
          new HttpError(
            'restaurant with specified id was not found.',
            404,
            'INVALID ID'
          )
        ];
      return [restaurant, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }

  public async delete(id: string): PromiseHandler<IRestaurant> {
    const objectId = RestaurantRepository.createIdFromString(id);
    try {
      const restaurant = await this._repo.delete(objectId);
      if (!restaurant)
        return [
          null,
          new HttpError(
            'restaurant with specified id was not found.',
            404,
            'INVALID ID'
          )
        ];
      return [restaurant, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }
}
