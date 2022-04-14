import { ConnectOptions, Types } from 'mongoose';
import express, { Application } from 'express';

import MealService from '../MealService';
import Server from '../../../../Server';
import Database from '../../../../config/Database';
import { DATABASE_URL } from '../../../../config/constants';
import { Meal } from '../../models';

const db = new Database(DATABASE_URL, {
  useNewUrlParser: true
} as ConnectOptions);

const server: Server = Server.instantiate(3000);
let app: Application;

const mealsrv = new MealService();

const fakeId = '123456789123123456789123';
const realId = new Types.ObjectId();
const meal = {
  _id: realId,
  name: 'pizza',
  price: 8,
  description: 'tasty pizza'
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

beforeEach(async () => {
  await new Meal(meal).save();
});

afterEach(async () => {
  await Meal.deleteMany({});
});

describe('get meals', () => {
  it('should return arr if query is {}', async () => {
    const [meals] = await mealsrv.get({});
    expect(meals).toBeTruthy();
    expect(Array.isArray(meals)).toBeTruthy();
  });

  it('should return arr if query is no empty object', async () => {
    const [meals] = await mealsrv.get({
      name: 'pizza',
      max_price: 5
    });
    expect(meals).toBeTruthy();
    expect(Array.isArray(meals)).toBeTruthy();
  });

  it('should return arr if query is wrong object', async () => {
    const [meals] = await mealsrv.get({
      name: 'burger',
      test: 'test'
    });
    expect(meals).toBeTruthy();
    expect(Array.isArray(meals)).toBeTruthy();
  });
});

describe('get meal by id', () => {
  it('', async () => {
    console.log('test');
  });
});

describe('create meal', () => {
  it('', async () => {
    console.log('test');
  });
});

describe('update meal', () => {
  it('', async () => {
    console.log('test');
  });
});

describe('delete meals', () => {
  it('', async () => {
    console.log('test');
  });
});
