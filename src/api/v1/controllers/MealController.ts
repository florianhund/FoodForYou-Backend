import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';

import HttpController from './base/HttpController';
import { MealService } from '../services';
import { httpMethods } from '../interfaces/types';
import { validate } from '../middlewares';
import { MealSchema } from '../validators';

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
      handler: this.getMealById,
      validator: validate(checkSchema(MealSchema.id))
    },
    {
      path: '/query',
      method: httpMethods.POST,
      handler: this.getMeal
    },
    {
      path: '/',
      method: httpMethods.POST,
      handler: this.createMeal,
      validator: validate(checkSchema(MealSchema.create))
    },
    {
      path: '/:id',
      method: httpMethods.PATCH,
      handler: this.updateMeal,
      validator: validate(
        checkSchema({ ...MealSchema.id, ...MealSchema.update })
      )
    },
    {
      path: '/:id',
      method: httpMethods.DELETE,
      handler: this.deleteMeal,
      validator: validate(checkSchema(MealSchema.id))
    }
  ];

  async getAllMeals(req: Request, res: Response): Promise<Response> {
    const [meals, error] = await mealsrv.getAll();
    if (!meals) return super.sendError(res, error);
    return super.sendSuccess(res, meals);
  }

  async getMealById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [meal, error] = await mealsrv.getById(id);
    if (!meal) return super.sendError(res, error);
    return super.sendSuccess(res, meal);
  }

  async getMeal(req: Request, res: Response): Promise<Response> {
    const [meals] = await mealsrv.get(req.body);
    return super.sendSuccess(res, meals);
  }

  async createMeal(req: Request, res: Response): Promise<Response> {
    const [meal, error] = await mealsrv.create(req.body);
    if (!meal) return super.sendError(res, error);
    res.setHeader('Location', `/meals/${meal._id}`);
    return super.sendSuccess(res, {}, 201);
  }

  async updateMeal(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [meal, error] = await mealsrv.update(id, req.body);
    if (!meal) return super.sendError(res, error);
    return super.sendSuccess(res, {}, 204);
  }

  async deleteMeal(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [meal, error] = await mealsrv.delete(id);
    if (!meal) return super.sendError(res, error);
    return super.sendSuccess(res, {}, 204);
  }
}
