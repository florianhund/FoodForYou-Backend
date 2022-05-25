import BaseRepository from './base/BaseRepository';
import { Meal } from '../models';
import { IMeal } from '../interfaces/models';

export default class MealRepository extends BaseRepository<IMeal> {
  constructor() {
    super(Meal);
  }
}
