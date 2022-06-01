import { httpMethods } from '../interfaces/types';
import HttpController from './base/HttpController';

export default class AuthController extends HttpController {
  path = '/auth';

  routes = [];
}
