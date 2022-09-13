import { ConnectOptions, Types } from 'mongoose';
import express, { Application } from 'express';

import { OrderService } from '..';
import { OrderRepository } from '../../repositories';
import Server from '../../../../Server';
import Database from '../../../../config/Database';
import { DATABASE_URL } from '../../../../config/constants';
import { Order, User, Meal } from '../../models';
import { IOrder } from '../../interfaces/models';

const db = new Database(DATABASE_URL, {
  useNewUrlParser: true
} as ConnectOptions);

const server: Server = Server.instantiate(3000);
let app: Application;

const ordersrv = new OrderService(new OrderRepository());

const fakeId = '123456789123123456789123';
const realId = new Types.ObjectId();
const realUserId = new Types.ObjectId();
const realMealId = new Types.ObjectId();
const testOrder = {
  _id: realId,
  address: 'Rudolfstr. 7b',
  postalCode: 6067,
  userId: realUserId,
  meals: [realMealId]
};

beforeAll(async () => {
  db.init();
  server.loadGlobalMiddleware([
    express.urlencoded({ extended: false }),
    express.json()
  ]);
  server.loadControllers();
  app = server.app;

  await User.create({
    _id: realUserId,
    firstName: 'Florian',
    lastName: 'Hundegger',
    email: 'flo.hundegger@gmail.com',
    password: 'SevretPassword_2',
    provider: 'email',
    providerId: realId,
    otp: 7632,
    isVerified: false,
    isAdmin: false
  });

  await Meal.create({
    _id: realMealId,
    name: 'pizza',
    price: 8,
    isVegetarian: false,
    isVegan: false,
    rating: 4,
    calories: 400,
    description: 'tasty pizza'
  });
});

afterAll(() => {
  Database.closeAllConnections();
});

beforeEach(async () => {
  await new Order(testOrder).save();
});

afterEach(async () => {
  await Order.deleteMany({});
});

describe('get orders', () => {
  it('should return arr if query is {}', async () => {
    const [orders] = await ordersrv.getAll();
    expect(orders).toBeTruthy();
    expect(Array.isArray(orders)).toBeTruthy();
  });

  it('should return arr if query is not empty', async () => {
    const [orders] = await ordersrv.get({ maxPrice: 20 });
    expect(orders).toBeTruthy();
    expect(Array.isArray(orders)).toBeTruthy();
  });
});

describe('get order by id', () => {
  it('should return null if id is empty & 404 error', async () => {
    const [order, error] = await ordersrv.getById(fakeId);
    expect(order).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.code).toBe(404);
  });

  it('should return data if id is valid', async () => {
    const [order] = await ordersrv.getById(`${realId}`);
    expect(order).toBeTruthy();
    expect(order?.postalCode).toBe(testOrder.postalCode);
  });
});

describe('create order', () => {
  it('should create order', async () => {
    const [order] = await ordersrv.create({
      postalCode: 6060,
      address: 'In der Schranne 10',
      userId: realUserId,
      meals: [realMealId]
    } as unknown as IOrder);
    expect(order).toBeTruthy();
    expect(order?.address).toBe('In der Schranne 10');
  });
});

describe('update order', () => {
  it('should update user if id is valid', async () => {
    const [order] = await ordersrv.update(`${realId}`, {
      postalCode: 6020
    });

    expect(order).toBeTruthy();
    expect(order?.postalCode).toBe(6020);
  });

  it('should return 404 error if id is invalid', async () => {
    const [order, error] = await ordersrv.update(fakeId, {});
    expect(order).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.code).toBe(404);
  });

  it('should update price when adding meals', async () => {
    const [order] = await ordersrv.update(`${realId}`, {
      meals: [realMealId, realMealId, realMealId, realMealId]
    });

    expect(order).toBeTruthy();
    expect(order?.totalPrice).toBe(32); // 4x8
  });

  it('should update status when setting isDeliverd: true', async () => {
    const [order] = await ordersrv.update(`${realId}`, {
      isDelivered: true
    });

    expect(order).toBeTruthy();
    expect(order?.status).toBe('delivered');
  });
});

describe('delete orders', () => {
  it('should delete and return user if id is valid', async () => {
    const [order] = await ordersrv.delete(`${realId}`);
    expect(order).toBeTruthy();
    expect(order?.userId).toEqual(testOrder.userId);
  });

  it('should return 404 error if invalid id', async () => {
    const [orderedMeals, error] = await ordersrv.delete(fakeId);
    expect(orderedMeals).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.code).toBe(404);
  });
});
