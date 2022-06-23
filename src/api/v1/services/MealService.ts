import { UpdateQuery } from 'mongoose';
import { MealFilterQuery, MealSearchQuery } from '../interfaces';

import { IMeal } from '../interfaces/models';
import { PromiseHandler, MongooseOrder } from '../interfaces/types';
import { MealRepository } from '../repositories';
import HttpError from '../utils/HttpError';

export default class MealService {
  private _repo = new MealRepository();

  public async getById(id: string, fields?: string): PromiseHandler<IMeal> {
    const objectId = MealRepository.createIdFromString(id);
    try {
      const meal = await this._repo.findById(objectId, fields?.split(','));
      if (!meal) return [null, new HttpError('Invalid Id', 404)];
      return [meal, undefined];
    } catch (err) {
      return [null, new HttpError()];
      // same as return [null, undefined];
    }
  }

  public async getAll(
    sortQuery?: string,
    fields?: string
  ): PromiseHandler<IMeal[]> {
    try {
      const meals = await this._repo.findAll(
        MealRepository.getSortQuery(sortQuery || ''),
        fields?.split(',')
      );
      return [meals, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }

  public async get(
    {
      name,
      minPrice,
      maxPrice,
      isVegetarian,
      isVegan,
      allergenics,
      tags
    }: MealSearchQuery,
    sortQuery?: string,
    fields?: string
  ): PromiseHandler<IMeal[]> {
    const filterQuery: MealFilterQuery = {
      price: {
        $gte: minPrice || 0,
        $lte: maxPrice || 50
      },
      name: new RegExp(name || '', 'i'),
      allergenics: { $not: { $in: allergenics?.split(',') || [] } }
    };

    if (tags && tags.length > 0) {
      filterQuery.tags = { $in: tags?.split(',') || [] };
    }

    if (isVegetarian != null) {
      filterQuery.isVegetarian = isVegetarian;
    }

    if (isVegan != null) {
      filterQuery.isVegan = isVegan;
    }

    try {
      const meals = await this._repo.find(
        filterQuery,
        MealRepository.getSortQuery(sortQuery || ''),
        fields?.split(',')
      );
      return [meals, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }

  public async create(data: IMeal): PromiseHandler<IMeal> {
    try {
      const meal = await this._repo.create(data);
      return [meal, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }

  public async update(
    id: string,
    data: UpdateQuery<IMeal>
  ): PromiseHandler<IMeal> {
    const objectId = MealRepository.createIdFromString(id);
    try {
      const meal = await this._repo.update(objectId, data);
      if (!meal) return [null, new HttpError('Invalid id', 404)];
      return [meal, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }

  public async delete(id: string): PromiseHandler<IMeal> {
    const objectId = MealRepository.createIdFromString(id);
    try {
      const meal = await this._repo.delete(objectId);
      if (!meal) return [null, new HttpError('Invalid Id', 404)];
      return [meal, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }
}
