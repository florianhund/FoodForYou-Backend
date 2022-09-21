import { IRestaurant } from '../interfaces/models';
import { Restaurant } from '../models';
import BaseRepository from './base/BaseRepository';

export default class RestaurantRepository extends BaseRepository<IRestaurant> {
  constructor() {
    super(Restaurant);
  }
}
