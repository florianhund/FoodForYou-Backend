import { IRoute } from '../interfaces';
import { httpMethods } from '../interfaces/types';
import HttpController from './base/HttpController';

export default class RestaurantController extends HttpController {
  path = '/restaurants';

  routes: IRoute[] = [];
}
