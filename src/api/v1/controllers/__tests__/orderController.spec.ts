import { ConnectOptions, Types } from 'mongoose';

import Database from '../../../../config/Database';
import { DATABASE_URL } from '../../../../config/constants';
import { Order, User, Meal } from '../../models';
import SuperTest from '../../../../../__tests__/utils/SuperTest';

const db = new Database(DATABASE_URL, {
  useNewUrlParser: true
} as ConnectOptions);
const superTest = new SuperTest('/api/v1/ordrs');

const fakeId = '123456789123456789123456';
const realId = new Types.ObjectId();
const realUserId = new Types.ObjectId();
const realMealId = new Types.ObjectId();

const order = {
  _id: realId,
  address: 'Rudolfstr. 7b',
  postalCode: 6067,
  userId: realUserId,
  meals: [realMealId]
};

beforeAll(async () => {
  db.init();
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
    description: 'tasty pizza'
  });
});

afterAll(() => {
  Database.closeAllConnections();
});

beforeEach(async () => {
  await new Order(order).save();
});

afterEach(async () => {
  await Order.deleteMany({});
});

describe('GET /orders', () => {
  it('should return 200 & array if query object is empty', async () => {
    const response = await superTest.get('');

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
    expect(Array.isArray(response.body.data)).toBeTruthy();
  });

  it('should return 200 & arr if query is not empty', async () => {
    const response = await superTest.get('?min_price=12');

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
    expect(response.body.data).toBeTruthy();
  });
});

describe('GET /orders/:id', () => {
  it('should return 200 & object if valid id', async () => {
    const response = await superTest.get(`/${realId}`);

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
    expect(response.body.data._id).toBe(realId.toString());
  });

  it('should return 404 if id is invalid', async () => {
    const response = await superTest.get(`/${fakeId}`);

    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });

  it('should return 400 if id is not 24 chars long', async () => {
    const response = await superTest.get('/123');

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });
});

describe('POST /orders', () => {
  it('should create post & return 201', async () => {
    const data = {
      address: 'Rudolfstr. 7b',
      postalCode: 6067,
      userId: realUserId,
      meals: [realMealId]
    };

    const response = await superTest.post('', data);
    console.log(response.text);

    expect(response.statusCode).toBe(201);
    expect(response.headers.location).toBeTruthy();
  });

  it('should return 400 if meals is []', async () => {
    const data = {
      address: 'Rudolfstr. 7b',
      postalCode: 6067,
      userId: realUserId,
      meals: [realMealId]
    };

    const response = await superTest.post('', data);

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });

  it('should return 400 if user is null', async () => {
    const data = {
      address: 'Rudolfstr. 7b',
      postalCode: 6067,
      meals: []
    };

    const response = await superTest.post('', data);

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });

  it('should return 400 with other invalid input', async () => {
    const data = {
      postalCode: 'some string'
    };

    const response = await superTest.post('', data);

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });
});

describe('PATCH /orders/:id', () => {
  it('should return 204 and update data with valid id', async () => {
    const data = {
      postalCode: 6060
    };
    const response = await superTest.patch(`/${realId}`, data);

    expect(response.statusCode).toBe(204);
  });

  it('should return 204 if additional data', async () => {
    const data = {
      test: 'burger'
    };
    const response = await superTest.patch(`/${realId}`, data);

    expect(response.statusCode).toBe(204);
  });

  it('should return 404 if invalid id', async () => {
    const data = {
      postalCode: 6060
    };
    const response = await superTest.patch(`/${fakeId}`, data);

    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });

  it('should return 400 if wrong input data', async () => {
    const data = {
      address: 2342
    };

    const response = await superTest.patch('/123', data);

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });

  // it('should update price when adding meals', async () => {});

  // it('should update status when setting isDeliverd: true', async () => {});
});

describe('DELETE /orders/:id', () => {
  it('should return 204 if valid id', async () => {
    const response = await superTest.delete(`/${realId}`);

    expect(response.statusCode).toBe(204);
  });

  it('should return 404 if invalid id', async () => {
    const response = await superTest.delete(`/${fakeId}`);

    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });

  it('should return 400 if id is not 24 chars', async () => {
    const response = await superTest.delete('/123');

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });
});
