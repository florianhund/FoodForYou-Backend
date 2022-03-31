import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import HttpController from './base/HttpController';
import { MealService } from '../services';
import { httpMethods } from '../interfaces/types';
import { IMeal } from '../interfaces/models';
import { validate } from '../middlewares';

const mealsrv = new MealService();

export default class MealController extends HttpController {
  path = '/meals';

  routes = [
    {
      path: '/',
      method: httpMethods.GET,
      handler: this.getAllMeals
    },
    {
      path: '/:id',
      method: httpMethods.GET,
      handler: this.getMealById
    },
    {
      path: '/query',
      method: httpMethods.POST,
      handler: this.getMeal
    },
    {
      path: '/',
      method: httpMethods.POST,
      handler: this.createMeal
    },
    {
      path: '/:id',
      method: httpMethods.PATCH,
      handler: this.updateMeal
    },
    {
      path: '/:id',
      method: httpMethods.DELETE,
      handler: this.deleteMeal
    }
  ];

  async getAllMeals(req: Request, res: Response): Promise<Response> {
    const [meals] = await mealsrv.getAll();
    if (!meals) return super.sendError(res);
    return super.sendSuccess(res, meals);
  }

  async getMealById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [meal] = await mealsrv.getById(id);
    if (!meal) return super.sendError(res, 404, 'Invalid Id');
    return super.sendSuccess(res, meal);
  }

  async getMeal(req: Request, res: Response): Promise<Response> {
    const [meals] = await mealsrv.get(req.body);
    return super.sendSuccess(res, meals);
  }

  async createMeal(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) console.log('error');
    const [meal] = await mealsrv.create(req.body);
    if (!meal) return super.sendError(res, 400, 'Invalid Input');
    return super.sendSuccess(res, meal);
  }

  async updateMeal(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [meal, err] = await mealsrv.update(id, req.body);
    if (!err) return super.sendSuccess(res, meal);
    if (err.message === 'Invalid Input')
      return super.sendError(res, 400, 'Invalid Input');
    return super.sendError(res, 404, 'Invalid Id');
  }

  async deleteMeal(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [meal] = await mealsrv.delete(id);
    if (!meal) return super.sendError(res, 404, 'Invalid Id');
    return super.sendSuccess(res, meal);
  }
}
