import { Request, Response } from 'express';

import HttpController from './base/HttpController';
import { httpMethods } from '../interfaces/types';

export default class RestaurantController extends HttpController {
  path = '/restaurant';

  routes = [];
}
