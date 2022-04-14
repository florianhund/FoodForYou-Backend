import BaseRepository from './base/BaseRepository';
import { Restaurant } from '../models';
import { IRestaurant } from '../interfaces/models';

export default class RestaurantRepository extends BaseRepository<IRestaurant> {
  constructor() {
    super(Restaurant);
  }
}
