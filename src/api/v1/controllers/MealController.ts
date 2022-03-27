import { Request, Response } from 'express';

import HttpController from './base/HttpController';
import MealService from '../services/MealService';
import { httpMethods } from '../interfaces/types';
import { IMeal } from '../interfaces/models';

const mealsrv = new MealService();

export default class MealController extends HttpController {
  path = '/meal';

  routes = [
    {
      path: '/getall',
      method: httpMethods.GET,
      localMiddleware: [],
      handler: this.getAllMeals
    },
    {
      path: '/get/:id',
      method: httpMethods.GET,
      localMiddleware: [],
      handler: this.getMealById
    },
    {
      path: '/get',
      method: httpMethods.POST,
      localMiddleware: [],
      handler: this.getMeal
    },
    {
      path: '/create',
      method: httpMethods.POST,
      localMiddleware: [],
      handler: this.createMeal
    },
    {
      path: '/update/:id',
      method: httpMethods.PATCH,
      localMiddleware: [],
      handler: this.updateMeal
    },
    {
      path: '/delete',
      method: httpMethods.DELETE,
      localMiddleware: [],
      handler: this.deleteMeal
    }
  ];

  async getAllMeals(req: Request, res: Response): Promise<void> {
    const meals: [IMeal[]?, Error?] = await mealsrv.getAll();
    super.sendSuccess(res, meals[0]);
  }

  async getMealById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const meal: [IMeal?, Error?] = await mealsrv.getById(id);
    super.sendSuccess(res, meal[0]);
  }

  async getMeal(req: Request, res: Response): Promise<void> {
    const meals: [IMeal[]?, Error?] = await mealsrv.get(req.body);
    super.sendSuccess(res, meals[0]);
  }

  async createMeal(req: Request, res: Response): Promise<void> {
    const meal: [IMeal?, Error?] = await mealsrv.create(req.body);
    super.sendSuccess(res, meal[0], 201);
  }

  async updateMeal(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const meal: [IMeal?, Error?] = await mealsrv.update(id, req.body);
    super.sendSuccess(res, meal[0]);
  }

  async deleteMeal(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const meal: [IMeal?, Error?] = await mealsrv.delete(id);
    super.sendSuccess(res, meal[0]);
  }
}
