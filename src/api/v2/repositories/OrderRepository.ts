import BaseRepository from './base/BaseRepository';
import { IOrder } from '../interfaces/models';
import { Order } from '../models';

export default class OrderRepository extends BaseRepository<IOrder> {
  constructor() {
    super(Order);
  }
}
