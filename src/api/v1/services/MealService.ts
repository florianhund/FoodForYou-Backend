import { UpdateQuery } from 'mongoose';
import { MealFilterQuery, MealSearchQuery } from '../interfaces';

import { IMeal } from '../interfaces/models';
import { PromiseHandler, MongooseOrder } from '../interfaces/types';
import { MealRepository } from '../repositories';
import ValidationError from '../utils/ValidationError';

export default class MealService {
  private readonly _repo = new MealRepository();

  public async getById(id: string, fields?: string): PromiseHandler<IMeal> {
    const objectId = MealRepository.createIdFromString(id);
    try {
      const meal = await this._repo.findById(objectId, fields?.split(','));
      if (!meal) return [null, new ValidationError('Invalid Id', 404)];
      return [meal, undefined];
    } catch (err) {
      return [null, new ValidationError()];
      // same as return [null, undefined];
    }
  }

  public async getAll(
    sortQuery?: string,
    fields?: string
  ): PromiseHandler<IMeal[]> {
    try {
      const meals = await this._repo.findAll(
        this.getSortQuery(sortQuery),
        fields?.split(',')
      );
      return [meals, undefined];
    } catch (err) {
      return [null, new ValidationError()];
    }
  }

  public async get(
    { name, minPrice, maxPrice, allergenics, tags }: MealSearchQuery,
    sortQuery?: string,
    fields?: string
  ): PromiseHandler<IMeal[]> {
    const filterQuery: MealFilterQuery = {
      price: {
        $gte: minPrice || 0,
        $lte: maxPrice || 50
      },
      name: new RegExp(name || '', 'i'),
      allergenics: { $not: { $all: allergenics?.split(',') || [] } },
      tags: { $all: tags?.split(',') || [] }
    };

    try {
      const meals = await this._repo.find(
        filterQuery,
        this.getSortQuery(sortQuery),
        fields?.split(',')
      );
      return [meals, undefined];
    } catch (err) {
      return [null, new ValidationError()];
    }
  }

  public async create(data: IMeal): PromiseHandler<IMeal> {
    try {
      const meal = await this._repo.create(data);
      return [meal, undefined];
    } catch (err) {
      return [null, new ValidationError()];
    }
  }

  public async update(
    id: string,
    data: UpdateQuery<IMeal>
  ): PromiseHandler<IMeal> {
    const objectId = MealRepository.createIdFromString(id);
    try {
      const meal = await this._repo.update(objectId, data);
      if (!meal) return [null, new ValidationError('Invalid id', 404)];
      return [meal, undefined];
    } catch (err) {
      return [null, new ValidationError()];
    }
  }

  public async delete(id: string): PromiseHandler<IMeal> {
    const objectId = MealRepository.createIdFromString(id);
    try {
      const meal = await this._repo.delete(objectId);
      if (!meal) return [null, new ValidationError('Invalid Id', 404)];
      return [meal, undefined];
    } catch (err) {
      return [null, new ValidationError()];
    }
  }

  private getSortQuery(sort: string | undefined): MongooseOrder[] {
    const sortArray: MongooseOrder[] = [];

    if (!sort) return sortArray;

    const sorts = sort.split(',');
    sorts.forEach((sort, i) => {
      const dir = sort[0] === '-' ? -1 : 1;
      const field = dir === 1 ? sort : sort.slice(1);
      sortArray[i] = [field, dir];
    });

    return sortArray;
  }
}
