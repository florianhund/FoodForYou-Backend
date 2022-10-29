import { ConnectOptions, Types } from 'mongoose';
import express, { Application } from 'express';

import MealService from '../MealService';
import Server from '../../../../Server';
import Database from '../../../../config/Database';
import { DATABASE_URL } from '../../../../config/constants';
import { Meal } from '../../models';
import { IMeal } from '../../interfaces/models';
import { MealRepository } from '../../repositories';

const db = new Database(DATABASE_URL, {
  useNewUrlParser: true
} as ConnectOptions);

const server: Server = Server.instantiate(3000);
let app: Application;

const mealsrv = new MealService(new MealRepository());

const fakeId = '123456789123123456789123';
const realId = new Types.ObjectId();
const restaurantId = new Types.ObjectId();

const testMeal = {
  _id: realId,
  name: 'pizza',
  price: 8,
  rating: 3,
  calories: 600,
  description: 'tasty pizza',
  restaurant: {
    id: restaurantId
  }
};

beforeAll(() => {
  db.init();
  server.loadGlobalMiddleware([
    express.urlencoded({ extended: false }),
    express.json()
  ]);
  server.loadControllers();
  app = server.app;
});

afterAll(() => {
  Database.closeAllConnections();
});

beforeEach(async () => {
  await new Meal(testMeal).save();
});

afterEach(async () => {
  await Meal.deleteMany({});
});

describe('get meals', () => {
  it('should return arr if query is {}', async () => {
    const [meals] = await mealsrv.getAll();
    expect(meals).toBeTruthy();
    expect(Array.isArray(meals)).toBeTruthy();
  });

  it('should return arr if query is no empty object', async () => {
    const [meals] = await mealsrv.get({
      name: 'pizza',
      maxPrice: 5
    });

    expect(meals).toBeTruthy();
    expect(Array.isArray(meals)).toBeTruthy();
  });
});

describe('get meal by id', () => {
  it('should return null if id is empty & 404 error', async () => {
    const [meals, error] = await mealsrv.getById(fakeId);
    expect(meals).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.statusCode).toBe(404);
  });

  it('should return data if id is valid', async () => {
    const [meal] = await mealsrv.getById(`${realId}`);
    expect(meal).toBeTruthy();
    expect(meal?.name).toBe(testMeal.name);
  });
});

describe('create meal', () => {
  it('should create meal', async () => {
    const id = new Types.ObjectId();
    const [meal] = await mealsrv.create({
      _id: id,
      name: 'spaghetti',
      price: 9,
      rating: 3,
      calories: 600,
      restaurant: {
        id: restaurantId
      }
    } as unknown as IMeal);
    expect(meal).toBeTruthy();
    expect(meal?.price).toBe(9);
  });

  it('should set isVegetarian true if vegetarian tag', async () => {
    const [meal] = await mealsrv.create({
      name: 'pizza',
      price: 8,
      rating: 3,
      calories: 600,
      tags: ['Vegetarian'],
      restaurant: {
        id: restaurantId
      }
    } as unknown as IMeal);

    expect(meal).toBeTruthy();
    expect(meal?.isVegetarian).toBeTruthy();
  });
});

describe('update meal', () => {
  it('should update meal if id is valid', async () => {
    const [meal] = await mealsrv.update(`${realId}`, {
      price: 20
    });
    expect(meal).toBeTruthy();
    expect(meal?.price).toBe(20);
  });

  it('should return 404 error if id is invalid', async () => {
    const [meal, error] = await mealsrv.update(fakeId, {});
    expect(meal).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.statusCode).toBe(404);
  });

  it('should set isVegetarian true if vegetarian tag', async () => {
    const [meal] = await mealsrv.update(`${realId}`, {
      tags: ['Vegetarian']
    });

    expect(meal).toBeTruthy();
    expect(meal?.isVegetarian).toBeTruthy();
  });
});

describe('delete meals', () => {
  it('should delete and return meal if id is valid', async () => {
    const [meal] = await mealsrv.delete(`${realId}`);
    expect(meal).toBeTruthy();
    expect(meal?.name).toBe(testMeal.name);
  });

  it('should return 404 error if invalid id', async () => {
    const [meal, error] = await mealsrv.delete(fakeId);
    expect(meal).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.statusCode).toBe(404);
  });
});
