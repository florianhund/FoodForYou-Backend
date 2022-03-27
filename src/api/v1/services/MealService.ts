import mongoose, { ObjectId, UpdateQuery, FilterQuery } from 'mongoose';

import { IMeal } from '../interfaces/models';
import { PromiseHandler } from '../interfaces/types';
import MealRepository from '../repositories/MealRepository';

export default class MealService {
  private readonly _repo: MealRepository = new MealRepository();

  async getAll(): PromiseHandler<IMeal[]> {
    try {
      const meals: IMeal[] = await this._repo.findAll();
      return [meals, undefined];
    } catch (err) {
      return [undefined, err as Error];
    }
  }

  async getById(id: string): PromiseHandler<IMeal> {
    const objectId: mongoose.Types.ObjectId = this.createIdFromString(id);
    try {
      const meal: IMeal | null = await this._repo.findById(objectId);
      if (!meal) return [undefined, new Error('No meal found')];
      return [meal, undefined];
    } catch (err) {
      return [undefined, err as Error];
    }
  }

  async get(query: FilterQuery<IMeal>): PromiseHandler<IMeal[]> {
    try {
      const meals: IMeal[] = await this._repo.find(query);
      return [meals, undefined];
    } catch (err) {
      return [undefined, err as Error];
    }
  }

  async create(data: IMeal): PromiseHandler<IMeal> {
    try {
      const meal: IMeal = await this._repo.create(data);
      return [meal, undefined];
    } catch (err) {
      return [undefined, err as Error];
    }
  }

  async update(id: string, data: UpdateQuery<IMeal>): PromiseHandler<IMeal> {
    const objectId: mongoose.Types.ObjectId = this.createIdFromString(id);
    try {
      const meal: IMeal | null = await this._repo.update(objectId, data);
      if (!meal) return [undefined, new Error('No meal found')];
      return [meal, undefined];
    } catch (err) {
      return [undefined, err as Error];
    }
  }

  async delete(id: string): PromiseHandler<IMeal> {
    const objectId: mongoose.Types.ObjectId = this.createIdFromString(id);
    try {
      const meal: IMeal | null = await this._repo.delete(objectId);
      if (!meal) return [undefined, new Error('No meal found')];
      return [meal, undefined];
    } catch (err) {
      return [undefined, err as Error];
    }
  }

  private createIdFromString(id: string): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(id);
  }
}
