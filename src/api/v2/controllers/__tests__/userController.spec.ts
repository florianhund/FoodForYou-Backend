import { Types } from 'mongoose';

import { UserRepository } from '../../repositories';
import { UserService } from '../../services';
import UserController from '../UserController';
import { HttpError } from '../../utils';
import {
  getMockedRequest,
  getMockedResponse
} from '../../../../../__tests__/utils';
import { IUser } from '../../interfaces/models';
import { IHttpError } from '../../interfaces';

const userService = new UserService(new UserRepository());
const userController = new UserController(userService);

jest.mock('../../services');
const mockedUserService = jest.mocked(userService, true);

describe('UserController', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('UserController.__getUsers', () => {
    it('should send 200 response with empty query', async () => {
      const mockUsers = [
        {
          _id: new Types.ObjectId(),
          firstName: 'Florian',
          lastName: 'Hundegger',
          email: 'flo.hundegger@gmail.com',
          password: 'SevretPassword_2',
          provider: 'email',
          providerId: new Types.ObjectId(),
          otp: 6247,
          isVerified: false,
          isAdmin: false
        },
        {
          _id: new Types.ObjectId(),
          firstName: 'Florian',
          lastName: 'Hundegger',
          email: 'flo.hundegger@gmail.com',
          password: 'SevretPassword_2',
          provider: 'email',
          providerId: new Types.ObjectId(),
          otp: 6247,
          isVerified: false,
          isAdmin: false
        },
        {
          _id: new Types.ObjectId(),
          firstName: 'Florian',
          lastName: 'Hundegger',
          email: 'flo.hundegger@gmail.com',
          password: 'SevretPassword_2',
          provider: 'email',
          providerId: new Types.ObjectId(),
          otp: 6247,
          isVerified: false,
          isAdmin: false
        }
      ] as unknown as IUser[];
      const mockResponse: [IUser[], undefined] = [mockUsers, undefined];

      const mReq = getMockedRequest();
      const mRes = getMockedResponse();
      // userService.getById = jest.fn().mockResolvedValue(mockResponse);
      mockedUserService.getAll.mockResolvedValue(mockResponse);

      await userController.routes[0].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({ data: mockUsers });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });

    it('should return 500 error with empty query', async () => {
      const mockError = new HttpError(
        'User was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest();
      const mRes = getMockedResponse();
      mockedUserService.getAll.mockResolvedValue(mockResponse);

      await userController.routes[0].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(500);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({
        message: mockError.message,
        code: mockError.statusCode,
        status: mockError.statusMessage
      });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });
  });

  describe('UserController.__getUserById', () => {
    it('should send 200 response', async () => {
      const userId = new Types.ObjectId();
      const mockUser = {
        _id: new Types.ObjectId(),
        firstName: 'Florian',
        lastName: 'Hundegger',
        email: 'flo.hundegger@gmail.com',
        password: 'SevretPassword_2',
        provider: 'email',
        providerId: new Types.ObjectId(),
        otp: 6247,
        isVerified: false,
        isAdmin: false
      } as unknown as IUser;
      const mockResponse: [IUser, undefined] = [mockUser, undefined];

      const mReq = getMockedRequest({ id: userId.toString() });
      const mRes = getMockedResponse();
      // userService.getById = jest.fn().mockResolvedValue(mockResponse);
      mockedUserService.getById.mockResolvedValue(mockResponse);

      await userController.routes[2].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({ data: mockUser });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });

    it('should return 500 error', async () => {
      const mockError = new HttpError(
        'User was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest();
      const mRes = getMockedResponse();
      mockedUserService.getById.mockResolvedValue(mockResponse);

      await userController.routes[2].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(500);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({
        message: mockError.message,
        code: mockError.statusCode,
        status: mockError.statusMessage
      });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });
  });

  describe('UserController.__createUser', () => {
    it('should send 201 response', async () => {
      const user = {
        _id: new Types.ObjectId(),
        firstName: 'Florian',
        lastName: 'Hundegger',
        email: 'flo.hundegger@gmail.com',
        password: 'SevretPassword_2',
        provider: 'email',
        providerId: new Types.ObjectId(),
        otp: 6247,
        isVerified: false,
        isAdmin: false
      } as unknown as IUser;
      const mockResponse: [IUser, undefined] = [user, undefined];

      const mReq = getMockedRequest({}, { ...user });
      const mRes = getMockedResponse();
      mockedUserService.create.mockResolvedValue(mockResponse);

      await userController.routes[1].handler(mReq, mRes);

      expect(mRes.sendStatus).toHaveBeenCalledWith(201);
      expect(mRes.sendStatus).toHaveBeenCalledTimes(1);
    });

    it('should send 500 error', async () => {
      const user = {
        _id: new Types.ObjectId(),
        firstName: 'Florian',
        lastName: 'Hundegger',
        email: 'flo.hundegger@gmail.com',
        password: 'SevretPassword_2',
        provider: 'email',
        providerId: new Types.ObjectId(),
        otp: 6247,
        isVerified: false,
        isAdmin: false
      } as unknown as IUser;
      const mockError = new HttpError(
        'User was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({}, { ...user });
      const mRes = getMockedResponse();
      // userService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedUserService.create.mockResolvedValue(mockResponse);

      await userController.routes[1].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(500);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({
        message: mockError.message,
        code: mockError.statusCode,
        status: mockError.statusMessage
      });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });
  });

  describe('UserController.__updateUser', () => {
    it('should send 204 response', async () => {
      const userId = new Types.ObjectId();
      const updateQuery = { firstName: 'John' };
      const mockUser = {
        _id: new Types.ObjectId(),
        firstName: 'Florian',
        lastName: 'Hundegger',
        email: 'flo.hundegger@gmail.com',
        password: 'SevretPassword_2',
        provider: 'email',
        providerId: new Types.ObjectId(),
        otp: 6247,
        isVerified: false,
        isAdmin: false
      } as unknown as IUser;
      const mockResponse: [IUser, undefined] = [mockUser, undefined];

      const mReq = getMockedRequest({ id: userId.toString() }, { updateQuery });
      const mRes = getMockedResponse();
      mockedUserService.update.mockImplementation(() => {
        mockUser.firstName = updateQuery.firstName;
        return Promise.resolve(mockResponse);
      });

      await userController.routes[3].handler(mReq, mRes);

      expect(mRes.sendStatus).toHaveBeenCalledWith(204);
      expect(mRes.sendStatus).toHaveBeenCalledTimes(1);
    });

    it('should send 404 error', async () => {
      const userId = new Types.ObjectId('123456789123456789123456');
      const mockError = new HttpError(
        'No user with specified id was found.',
        404,
        'NOT_FOUND'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({ id: userId });
      const mRes = getMockedResponse();
      // userService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedUserService.update.mockResolvedValue(mockResponse);

      await userController.routes[3].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({
        message: mockError.message,
        code: mockError.statusCode,
        status: mockError.statusMessage
      });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });

    it('should return 500', async () => {
      const userId = new Types.ObjectId();
      const mockError = new HttpError(
        'User was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({ id: userId });
      const mRes = getMockedResponse();
      // userService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedUserService.update.mockResolvedValue(mockResponse);

      await userController.routes[3].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(500);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({
        message: mockError.message,
        code: mockError.statusCode,
        status: mockError.statusMessage
      });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });
  });

  describe('UserController.__deleteUser', () => {
    it('should return 204', async () => {
      const userId = new Types.ObjectId();
      const mockUser = {
        _id: new Types.ObjectId(),
        firstName: 'Florian',
        lastName: 'Hundegger',
        email: 'flo.hundegger@gmail.com',
        password: 'SevretPassword_2',
        provider: 'email',
        providerId: new Types.ObjectId(),
        otp: 6247,
        isVerified: false,
        isAdmin: false
      } as unknown as IUser;
      const mockResponse: [IUser, undefined] = [mockUser, undefined];

      const mReq = getMockedRequest({ id: userId });
      const mRes = getMockedResponse();
      // userService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedUserService.delete.mockResolvedValue(mockResponse);

      await userController.routes[4].handler(mReq, mRes);

      expect(mRes.sendStatus).toHaveBeenCalledWith(204);
      expect(mRes.sendStatus).toHaveBeenCalledTimes(1);
    });

    it('should return 404', async () => {
      const userId = new Types.ObjectId('123456789123456789123456');
      const mockError = new HttpError(
        'No user with specified id was found.',
        404,
        'NOT_FOUND'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({ id: userId });
      const mRes = getMockedResponse();
      // userService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedUserService.delete.mockResolvedValue(mockResponse);

      await userController.routes[4].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({
        message: mockError.message,
        code: mockError.statusCode,
        status: mockError.statusMessage
      });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });

    it('should return 500', async () => {
      const userId = new Types.ObjectId();
      const mockError = new HttpError(
        'User was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({ id: userId });
      const mRes = getMockedResponse();
      // restaurantService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedUserService.delete.mockResolvedValue(mockResponse);

      await userController.routes[4].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(500);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({
        message: mockError.message,
        code: mockError.statusCode,
        status: mockError.statusMessage
      });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });
  });
});
