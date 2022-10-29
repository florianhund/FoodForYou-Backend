import { ConnectOptions, Types } from 'mongoose';
import express, { Application } from 'express';

import RestaurantService from '../RestaurantService';
import Server from '../../../../Server';
import Database from '../../../../config/Database';
import { DATABASE_URL } from '../../../../config/constants';
import { Restaurant } from '../../models';
import { IRestaurant } from '../../interfaces/models';
import { RestaurantRepository } from '../../repositories';

const db = new Database(DATABASE_URL, {
  useNewUrlParser: true
} as ConnectOptions);

const server: Server = Server.instantiate(3000);
let app: Application;

const restaurantsrv = new RestaurantService(new RestaurantRepository());

const fakeId = '123456789123123456789123';
const realId = new Types.ObjectId();
const testRestaurant = {
  _id: realId,
  name: 'il mondo',
  rating: 7,
  postalCode: 6060,
  address: 'hallstraße'
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
  await new Restaurant(testRestaurant).save();
});

afterEach(async () => {
  await Restaurant.deleteMany({});
});

describe('get restaurants', () => {
  it('should return arr if query is {}', async () => {
    const [restaurants] = await restaurantsrv.getAll();
    expect(restaurants).toBeTruthy();
    expect(Array.isArray(restaurants)).toBeTruthy();
  });

  it('should return arr if query is no empty object', async () => {
    const [restaurants] = await restaurantsrv.get({
      minRating: 5
    });

    expect(restaurants).toBeTruthy();
    expect(Array.isArray(restaurants)).toBeTruthy();
  });
});

describe('get restaurant by id', () => {
  it('should return null if id is empty & 404 error', async () => {
    const [restaurants, error] = await restaurantsrv.getById(fakeId);
    expect(restaurants).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.statusCode).toBe(404);
  });

  it('should return data if id is valid', async () => {
    const [restaurant] = await restaurantsrv.getById(`${realId}`);
    expect(restaurant).toBeTruthy();
    expect(restaurant?.name).toBe(testRestaurant.name);
  });
});

describe('create restaurant', () => {
  it('should create restaurant', async () => {
    const id = new Types.ObjectId();
    const [restaurant] = await restaurantsrv.create({
      _id: id,
      name: 'il mondo',
      rating: 7,
      postalCode: 6060,
      address: 'hallstraße'
    } as IRestaurant);
    expect(restaurant).toBeTruthy();
    expect(restaurant?.rating).toBe(7);
  });
});

describe('update restaurant', () => {
  it('should update restaurant if id is valid', async () => {
    const [restaurant] = await restaurantsrv.update(`${realId}`, {
      rating: 3
    });
    expect(restaurant).toBeTruthy();
    expect(restaurant?.rating).toBe(3);
  });

  it('should return 404 error if id is invalid', async () => {
    const [restaurant, error] = await restaurantsrv.update(fakeId, {});
    expect(restaurant).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.statusCode).toBe(404);
  });
});

describe('delete restaurants', () => {
  it('should delete and return restaurant if id is valid', async () => {
    const [restaurant] = await restaurantsrv.delete(`${realId}`);
    expect(restaurant).toBeTruthy();
    expect(restaurant?.name).toBe(testRestaurant.name);
  });

  it('should return 404 error if invalid id', async () => {
    const [restaurant, error] = await restaurantsrv.delete(fakeId);
    expect(restaurant).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.statusCode).toBe(404);
  });
});
