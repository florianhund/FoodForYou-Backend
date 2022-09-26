import { ConnectOptions, Types } from 'mongoose';

import Database from '../../../../config/Database';
import { DATABASE_URL } from '../../../../config/constants';
import { Restaurant } from '../../models';
import SuperTest from '../../../../../__tests__/utils/SuperTest';

const db = new Database(DATABASE_URL, {
  useNewUrlParser: true
} as ConnectOptions);
const superTest = new SuperTest('/api/v2/restaurants');

const fakeId = '123456789123456789123456';
const realId = new Types.ObjectId();

const restaurant = {
  _id: realId,
  name: 'il mondo',
  rating: 7,
  postalCode: 6060,
  address: 'hallstraße'
};

beforeAll(() => {
  db.init();
});

afterAll(() => {
  Database.closeAllConnections();
});

beforeEach(async () => {
  await new Restaurant(restaurant).save();
});

afterEach(async () => {
  await Restaurant.deleteMany({});
});

describe('GET /restaurants', () => {
  it('should return 200 & array if query object is empty', async () => {
    const response = await superTest.get('');

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
    expect(Array.isArray(response.body.data)).toBeTruthy();
  });

  it('should return 200 & array if query object is not empty', async () => {
    const response = await superTest.get('?postal_code=6034');

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
    expect(Array.isArray(response.body.data)).toBeTruthy();
  });
});

describe('GET /restaurants/:id', () => {
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

describe('POST /restaurants', () => {
  it('should create post & return 201', async () => {
    const data = {
      name: 'il mondo',
      rating: 7,
      postalCode: 6060,
      address: 'hallstraße'
    };

    const response = await superTest.post('', data);

    expect(response.statusCode).toBe(201);
    expect(response.headers.location).toBeTruthy();
  });

  it('should return 400 with invalid input', async () => {
    const data = {
      name: 'pizza restaurant'
    };

    const response = await superTest.post('', data);

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });
});

describe('PATCH /restaurants/:id', () => {
  it('should return 204 and update data with valid id', async () => {
    const data = {
      rating: 5
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
      name: 'lasagne',
      price: 2
    };
    const response = await superTest.patch(`/${fakeId}`, data);

    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });

  it('should return 400 if wrong input data', async () => {
    const data = {
      rating: 'sdome'
    };

    const response = await superTest.patch('/123', data);

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });
});

describe('DELETE /restaurants/:id', () => {
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
