import { ConnectOptions, Types } from 'mongoose';
import express, { Application } from 'express';

import { UserService } from '..';
import Server from '../../../../Server';
import Database from '../../../../config/Database';
import { DATABASE_URL } from '../../../../config/constants';
import { User } from '../../models';
import { IUser } from '../../interfaces/models';

const db = new Database(DATABASE_URL, {
  useNewUrlParser: true
} as ConnectOptions);

const server: Server = Server.instantiate(3000);
let app: Application;

const usersrv = new UserService();

const fakeId = '123456789123123456789123';
const realId = new Types.ObjectId();
const testUser = {
  _id: realId,
  firstName: 'Florian',
  lastName: 'Hundegger',
  email: 'flo.hundegger@gmail.com',
  password: 'SevretPassword_2',
  provider: 'email',
  providerId: realId,
  isVerified: false,
  isAdmin: false,
  otp: 8923
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
  await new User(testUser).save();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('get users', () => {
  it('should return arr if query is {}', async () => {
    const [users] = await usersrv.getAll();
    expect(users).toBeTruthy();
    expect(Array.isArray(users)).toBeTruthy();
  });

  it('should return user if real username', async () => {
    const [user] = await usersrv.getByEmail('flo.hundegger@gmail.com');

    expect(user).toBeTruthy();
  });

  it('should return null if wrong username', async () => {
    const [user] = await usersrv.getByEmail('something');

    expect(user).toBeNull();
  });
});

describe('get user by id', () => {
  it('should return null if id is empty & 404 error', async () => {
    const [users, error] = await usersrv.getById(fakeId);
    expect(users).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.code).toBe(404);
  });

  it('should return data if id is valid', async () => {
    const [user] = await usersrv.getById(`${realId}`);
    expect(user).toBeTruthy();
    expect(user?.firstName).toBe(testUser.firstName);
  });
});

describe('create user', () => {
  it('should create user', async () => {
    const [user] = await usersrv.create({
      firstName: 'Florian',
      lastName: 'Hundegger',
      email: 'f.hundegger@gmail.com',
      password: 'SevretPassword_2',
      isVerified: false,
      isAdmin: false,
      otp: 4527
    } as unknown as IUser);

    expect(user).toBeTruthy();
    expect(user?.lastName).toBe('Hundegger');
  });
});

describe('update user', () => {
  it('should update user if id is valid', async () => {
    const [user] = await usersrv.update(`${realId}`, {
      firstName: 'Stefan'
    });
    expect(user).toBeTruthy();
    expect(user?.firstName).toBe('Stefan');
  });

  it('should return 404 error if id is invalid', async () => {
    const [user, error] = await usersrv.update(fakeId, {});
    expect(user).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.code).toBe(404);
  });
});

describe('delete users', () => {
  it('should delete and return user if id is valid', async () => {
    const [user] = await usersrv.delete(`${realId}`);
    expect(user).toBeTruthy();
    expect(user?.firstName).toBe(testUser.firstName);
  });

  it('should return 404 error if invalid id', async () => {
    const [user, error] = await usersrv.delete(fakeId);
    expect(user).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.code).toBe(404);
  });
});
