import { ConnectOptions, Types } from 'mongoose';
import nodemailer, { Transporter } from 'nodemailer';

import Database from '../../src/config/Database';
import { DATABASE_URL } from '../../src/config/constants';
import { User } from '../../src/api/v2/models';
import SuperTest from '../utils/SuperTest';
import { IUser } from '../../src/api/v2/interfaces/models';

jest.mock('nodemailer');
const mockedNodemailer = jest.mocked(nodemailer);

const db = new Database(DATABASE_URL, {
  useNewUrlParser: true
} as ConnectOptions);
const superTest = new SuperTest('/api/v2/users');

const fakeId = '123456789123456789123456';
const realId = new Types.ObjectId();
const realOtp = 4591;
const userModel = {
  _id: realId,
  firstName: 'Florian',
  lastName: 'Hundegger',
  email: 'flo.hundegger@gmail.com',
  password: 'SevretPassword_2',
  provider: 'email',
  providerId: realId,
  otp: realOtp,
  isVerified: false,
  isAdmin: false
};
let user: IUser;

beforeAll(() => {
  db.init();
});

afterAll(() => {
  Database.closeAllConnections();
});

beforeEach(async () => {
  user = await new User(userModel).save();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('GET /users', () => {
  it('should return 200 & array if query object is empty', async () => {
    const response = await superTest.get('');

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
    expect(Array.isArray(response.body.data)).toBeTruthy();
  });

  it('should return 200 if email query is real & return single document', async () => {
    const response = await superTest.get('?email=flo.hundegger@gmail.com');

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
    expect(response.body.data).toBeTruthy();
  });

  it('should return 404 if email query is wrong', async () => {
    const response = await superTest.get('?email=something');

    expect(response.statusCode).toBe(404);
  });
});

describe('GET /users/:id', () => {
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

describe('POST /users', () => {
  it('should create post & return 201', async () => {
    const data = {
      firstName: 'Florian',
      lastName: 'Hundegger',
      email: 'f.hundegger@gmail.com',
      password: 'SevretPassword_2',
      otp: 1234
    };

    const response = await superTest.post('', data);

    expect(response.statusCode).toBe(201);
    expect(response.headers.location).toBeTruthy();
  });

  it('should return 400 with invalid input', async () => {
    const data = {
      firstName: 'pizza'
    };

    const response = await superTest.post('', data);

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });
});

describe('PATCH /users/:id', () => {
  it('should return 204 and update data with valid id', async () => {
    const data = {
      firstName: 'Stefan'
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
      firstName: 'Stefan'
    };
    const response = await superTest.patch(`/${fakeId}`, data);

    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });

  it('should return 400 if wrong input data', async () => {
    const data = {
      firstName: 'Hello Im too longgggggggggggggggg'
    };

    const response = await superTest.patch('/123', data);

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/g);
  });
});

describe('DELETE /users/:id', () => {
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

describe('GET /users/:id/verify', () => {
  it('should return 204 & verify user if otp is right', async () => {
    const response = await superTest.get(`/${realId}/verify?otp=${realOtp}`);

    expect(response.statusCode).toBe(204);
  });

  it('should return 401 if otp is not right', async () => {
    const response = await superTest.get(`/${realId}/verify?otp=1000`);

    expect(response.statusCode).toBe(401);
  });

  it('should return 404 if id is invalid', async () => {
    const response = await superTest.get(`/${fakeId}/verify?otp=${realOtp}`);

    expect(response.statusCode).toBe(404);
  });

  it('should return 400 if otp is undefined', async () => {
    const response = await superTest.get(`/${realId}/verify`);

    expect(response.statusCode).toBe(400);
  });
});

describe('GET /users/:id/send-verification', () => {
  it('should return 204', async () => {
    const mockedSendmailFn = jest.fn();
    mockedNodemailer.createTransport.mockReturnValue({
      sendMail: mockedSendmailFn
    } as unknown as Transporter);

    const response = await superTest.get(`/${realId}/send-verification`);

    expect(response.statusCode).toBe(204);
    expect(mockedNodemailer.createTransport).toHaveBeenCalledTimes(1);
    expect(mockedSendmailFn).toHaveBeenCalledTimes(1);
  });

  it('should return 404', async () => {
    const response = await superTest.get(`/${fakeId}/send-verification`);

    expect(response.statusCode).toBe(404);
  });
});

describe('POST /users/:id/verify', () => {
  it('should return 204', async () => {
    const response = await superTest.get(`/${realId}/verify?otp=${realOtp}`);

    expect(response.statusCode).toBe(204);
  });

  it('should return 400 if otp not defined', async () => {
    const response = await superTest.get(`/${realId}/verify`);

    expect(response.statusCode).toBe(400);
    expect(user.otp).toBe(realOtp);
    expect(user.isVerified).toBe(false);
  });

  it('should return 404 if token not defined', async () => {
    const response = await superTest.get(`/${fakeId}/verify?otp=${realOtp}`);

    expect(response.statusCode).toBe(404);
    expect(user.otp).toBe(realOtp);
    expect(user.isVerified).toBe(false);
  });

  it('should return 404 if token not defined', async () => {
    const response = await superTest.get(`/${realId}/verify?otp=3636`);

    expect(response.statusCode).toBe(401);
    expect(user.otp).toBe(realOtp);
    expect(user.isVerified).toBe(false);
  });
});
