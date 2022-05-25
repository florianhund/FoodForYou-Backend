import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';

import HttpController from './base/HttpController';
import { hasAllNullishValues } from '../utils';
import { MealService } from '../services';
import { httpMethods } from '../interfaces/types';
import { validate } from '../middlewares';
import { mealSchema } from '../validators';
import { MealQuery } from '../interfaces';

const mealsrv = new MealService();

export default class MealController extends HttpController {
  path = '/meals';

  routes = [
    {
      path: '/',
      method: httpMethods.GET,
      handler: this.getMeals,
      validator: validate(checkSchema(mealSchema.get))
    },
    {
      path: '/',
      method: httpMethods.POST,
      handler: this.createMeal,
      validator: validate(checkSchema(mealSchema.create))
    },
    {
      path: '/:id',
      method: httpMethods.GET,
      handler: this.getMealById,
      validator: validate(checkSchema(mealSchema.id))
    },
    {
      path: '/:id',
      method: httpMethods.PATCH,
      handler: this.updateMeal,
      validator: validate(
        checkSchema({ ...mealSchema.id, ...mealSchema.update })
      )
    },
    {
      path: '/:id',
      method: httpMethods.DELETE,
      handler: this.deleteMeal,
      validator: validate(checkSchema(mealSchema.id))
    }
  ];

  private async getMeals(req: Request, res: Response): Promise<Response> {
    const {
      name,
      min_price: minPrice,
      max_price: maxPrice,
      without_allergenics: allergenics,
      sort_by: sort,
      isVegetarian,
      isVegan,
      tags,
      fields
    } = req.query as unknown as MealQuery;

    const filter = {
      name,
      minPrice,
      maxPrice,
      allergenics,
      isVegetarian,
      isVegan,
      tags
    };

    const [meals, error] = !hasAllNullishValues(filter)
      ? await mealsrv.get(filter, sort, fields)
      : await mealsrv.getAll(sort, fields);

    if (!meals) return super.sendError(res, error);
    return super.sendSuccess(res, meals);
  }

  private async getMealById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { fields } = req.query as MealQuery;
    const [meal, error] = await mealsrv.getById(id, fields);
    if (!meal) return super.sendError(res, error);
    return super.sendSuccess(res, meal);
  }

  private async createMeal(req: Request, res: Response): Promise<Response> {
    const [meal, error] = await mealsrv.create(req.body);
    if (!meal) return super.sendError(res, error);
    res.setHeader('Location', `/meals/${meal._id}`);
    return super.sendSuccess(res, {}, 201);
  }

  private async updateMeal(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [meal, error] = await mealsrv.update(id, req.body);
    if (!meal) return super.sendError(res, error);
    return super.sendSuccess(res, {}, 204);
  }

  private async deleteMeal(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [meal, error] = await mealsrv.delete(id);
    if (!meal) return super.sendError(res, error);
    return super.sendSuccess(res, {}, 204);
  }
}
