import { UpdateQuery, FilterQuery } from 'mongoose';

import { IMeal } from '../interfaces/models';
import { PromiseHandler } from '../interfaces/types';
import { MealRepository } from '../repositories';
import ValidationError from '../utils/ValidationError';

export default class MealService {
  private readonly _repo = new MealRepository();

  async getAll(): PromiseHandler<IMeal[]> {
    try {
      const meals: IMeal[] = await this._repo.findAll();
      return [meals, undefined];
    } catch (err) {
      return [null, new ValidationError()];
    }
  }

  async getById(id: string): PromiseHandler<IMeal> {
    const objectId = this._repo.createIdFromString(id);
    try {
      const meal: IMeal | null = await this._repo.findById(objectId);
      if (!meal) return [null, new ValidationError('Invalid Id', 404)];
      return [meal, undefined];
    } catch (err) {
      return [null, new ValidationError()];
      // same as return [null, undefined];
    }
  }

  async get(query: FilterQuery<IMeal>): PromiseHandler<IMeal[]> {
    try {
      const meals: IMeal[] = await this._repo.find(query);
      return [meals, undefined];
    } catch (err) {
      return [null, new ValidationError()];
    }
  }

  async create(data: IMeal): PromiseHandler<IMeal> {
    try {
      const meal: IMeal = await this._repo.create(data);
      return [meal, undefined];
    } catch (err) {
      return [null, new ValidationError()];
    }
  }

  async update(id: string, data: UpdateQuery<IMeal>): PromiseHandler<IMeal> {
    const objectId = this._repo.createIdFromString(id);
    try {
      const meal: IMeal | null = await this._repo.update(objectId, data);
      if (!meal) return [null, new ValidationError('Invalid id', 404)];
      return [meal, undefined];
    } catch (err) {
      return [null, new ValidationError()];
    }
  }

  async delete(id: string): PromiseHandler<IMeal> {
    const objectId = this._repo.createIdFromString(id);
    try {
      const meal: IMeal | null = await this._repo.delete(objectId);
      if (!meal) return [null, new ValidationError('Invalid Id', 404)];
      return [meal, undefined];
    } catch (err) {
      return [null, new ValidationError()];
    }
  }
}
