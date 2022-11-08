import { ConnectOptions, Types } from 'mongoose';
import bcrypt from 'bcrypt';

import Database from '../../src/config/Database';
import { DATABASE_URL } from '../../src/config/constants';
import SuperTest from '../utils/SuperTest';
import { User } from '../../src/api/v2/models';

const db = new Database(DATABASE_URL, {
  useNewUrlParser: true
} as ConnectOptions);
const superTest = new SuperTest('/api/v2/auth');
const userId = new Types.ObjectId();

const user = {
  _id: userId,
  firstName: 'Florian',
  lastName: 'Hundegger',
  email: 'flo.hundegger@gmail.com',
  password: 'SevretPassword_2',
  provider: 'email',
  providerId: userId,
  otp: null,
  isVerified: true,
  isAdmin: false
};

beforeAll(async () => {
  db.init();
  user.password = await bcrypt.hash(user.password, 10);
});

afterAll(() => {
  Database.closeAllConnections();
});

beforeEach(async () => {
  await new User(user).save();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('POST /auth/login', () => {
  it('should redirect if login is successfull', async () => {
    const response = await superTest.post('/login', {
      email: user.email,
      password: 'SevretPassword_2'
    });

    expect(response.headers.location).toBe('/');
    expect(response.statusCode).toBe(302);
  });

  it('should return error if wrong password', async () => {
    const response = await superTest.post('/login', {
      email: user.email,
      password: 'wrong password'
    });

    expect(response.headers.location).toBe('/api/v2/auth/login/failed');
    expect(response.statusCode).toBe(302);
  });

  it('should return error if user does not exist', async () => {
    const response = await superTest.post('/login', {
      email: 'someemail',
      password: 'wrong password'
    });

    expect(response.headers.location).toBe('/api/v2/auth/login/failed');
    expect(response.statusCode).toBe(302);
  });

  it('should return error if user provider is not email', async () => {
    const userWithWrongProvider = await new User({
      email: 'john.doe@gmail.com',
      provider: 'google',
      firstName: 'Florian',
      lastName: 'Hundegger',
      password: await bcrypt.hash(user.password, 10),
      providerId: '23049dfslj52',
      otp: null,
      isVerified: true,
      isAdmin: false
    }).save();

    const response = await superTest.post('/login', {
      email: userWithWrongProvider.email,
      password: 'SevretPassword_2'
    });

    expect(response.headers.location).toBe('/api/v2/auth/login/failed');
    expect(response.statusCode).toBe(302);
  });
});

describe('DELETE /auth/logout', () => {
  it('should return 204', async () => {
    const loginResponse = await superTest.post('/login', {
      email: user.email,
      password: 'SevretPassword_2'
    });

    const logoutResponse = await superTest.delete('/logout');

    expect(loginResponse.headers.location).toBe('/');
    expect(logoutResponse.statusCode).toBe(204);
  });

  it('should return 401', async () => {
    const response = await superTest.delete('/logout');

    expect(response.statusCode).toBe(401);
  });
});
