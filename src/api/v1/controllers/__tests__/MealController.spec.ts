import request from 'supertest';
import express, { Application } from 'express';
import { ConnectOptions, Types } from 'mongoose';

import Server from '../../../../Server';
import Database from '../../../../config/Database';
import { DATABASE_URL } from '../../../../config/constants';
import { Meal } from '../../models';

const db = new Database(DATABASE_URL, {
  useNewUrlParser: true
} as ConnectOptions);

const server: Server = Server.instantiate(3000);
let app: Application;

const fakeId = '123456789123456789123456';
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

afterAll(() => {
  Database.closeAllConnections();
});

beforeEach(async () => {
  await new Meal(meal).save();
});

afterEach(async () => {
  await Meal.deleteMany({});
});

describe('GET /meals', () => {
  it('should return 200 & array if query object is empty', async () => {
    const response = await request(app).get('/api/v1/meals');

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
    expect(Array.isArray(response.body.data)).toBeTruthy();
  });

  it('should return 200 & array if query object is not empty', async () => {
    const response = await request(app).get('/api/v1/meals?name=pizza');

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
    expect(Array.isArray(response.body.data)).toBeTruthy();
  });

  it('should return 400 if query[without_allergenics] is no allergenic', async () => {
    const response = await request(app).get(
      '/api/v1/meals?without_allergenics=Z'
    );

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });
});

describe('GET /meals/:id', () => {
  it('should return 200 & object if valid id', async () => {
    const response = await request(app).get(`/api/v1/meals/${realId}`);

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
    expect(response.body.data._id).toBe(realId.toString());
  });

  it('should return 404 if id is invalid', async () => {
    const response = await request(app).get(`/api/v1/meals/${fakeId}`);

    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });

  it('should return 400 if id is not 24 chars long', async () => {
    const response = await request(app).get('/api/v1/meals/123');

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });
});

describe('POST /meals', () => {
  it('should create post & return 201', async () => {
    const data = {
      name: 'pizza',
      price: 8
    };

    const response = await request(app)
      .post('/api/v1/meals')
      .set('Content-Type', 'Application/json')
      .send(data);

    expect(response.statusCode).toBe(201);
    expect(response.headers.location).toBeTruthy();
  });

  it('should return 400 with invalid input', async () => {
    const data = {
      name: 'pizza'
    };

    const response = await request(app)
      .post('/api/v1/meals')
      .set('Content-Type', 'Application/json')
      .send(data);

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });
});

describe('PATCH /meals/:id', () => {
  it('should return 204 and update data with valid id', async () => {
    const data = {
      price: 6
    };
    const response = await request(app)
      .patch(`/api/v1/meals/${realId}`)
      .set('Content-Type', 'Application/json')
      .send(data);

    expect(response.statusCode).toBe(204);
  });

  it('should return 204 if additional data', async () => {
    const data = {
      test: 'burger'
    };
    const response = await request(app)
      .patch(`/api/v1/meals/${realId}`)
      .set('Content-Type', 'Application/json')
      .send(data);

    expect(response.statusCode).toBe(204);
  });

  it('should return 404 if invalid id', async () => {
    const data = {
      name: 'lasagne',
      price: 2
    };
    const response = await request(app)
      .patch(`/api/v1/meals/${fakeId}`)
      .set('Content-Type', 'Application/json')
      .send(data);

    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });

  it('should return 400 if wrong input data', async () => {
    const data = {
      name: 'burger',
      price: 1000
    };

    const response = await request(app)
      .patch(`/api/v1/meals/123`)
      .set('Content-Type', 'Application/json')
      .send(data);

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });
});

describe('DELETE /meals/:id', () => {
  it('should return 204 if valid id', async () => {
    const response = await request(app).delete(`/api/v1/meals/${realId}`);

    expect(response.statusCode).toBe(204);
  });

  it('should return 404 if invalid id', async () => {
    const response = await request(app).delete(`/api/v1/meals/${fakeId}`);

    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });

  it('should return 400 if id is not 24 chars', async () => {
    const response = await request(app).delete('/api/v1/meals/123');

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });
});
