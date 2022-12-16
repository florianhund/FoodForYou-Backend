import { Types } from 'mongoose';

import { UserRepository as UserRepo } from '..';
import { User } from '../../models';
import { IUser } from '../../interfaces/models';

const userRepo = new UserRepo();

describe('UserRepo', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('UserRepo.__findAll', () => {
    it('should return users', async () => {
      const mockResponse = [
        {
          _id: new Types.ObjectId(),
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@gmail.com',
          password: 'SecretPassword_2',
          provider: 'google',
          providerId: '12480lwljv90',
          otp: 4593,
          isVerified: false,
          isAdmin: false,
          __v: 0
        },
        {
          _id: new Types.ObjectId(),
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@gmail.com',
          password: 'SecretPassword_2',
          provider: 'google',
          providerId: '329bj32klsdf2',
          otp: 4593,
          isVerified: false,
          isAdmin: false,
          __v: 0
        }
      ];

      User.find = jest.fn().mockImplementation(() => ({
        sort: jest.fn().mockImplementation(() => ({
          select: jest.fn().mockResolvedValue(mockResponse)
        }))
      }));

      const result = await userRepo.findAll();

      expect(result).toEqual(mockResponse);
      expect(User.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('UserRepo.__find', () => {
    it('should return users', async () => {
      const query = { rating: { $gte: 7 } };
      const userId = new Types.ObjectId();
      const mockResponse = [
        {
          _id: userId,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@gmail.com',
          password: 'SecretPassword_2',
          provider: 'email',
          providerId: userId,
          otp: 4593,
          isVerified: false,
          isAdmin: false,
          __v: 0
        }
      ];

      User.find = jest.fn().mockImplementation(() => ({
        sort: jest.fn().mockImplementation(() => ({
          select: jest.fn().mockResolvedValue(mockResponse)
        }))
      }));

      const result = await userRepo.find(query);

      expect(result).toEqual(mockResponse);
      expect(User.find).toHaveBeenCalledTimes(1);
      expect(User.find).toHaveBeenCalledWith(query);
    });
  });

  describe('UserRepo.__findById', () => {
    it('should return user', async () => {
      const userId = new Types.ObjectId();
      const mockResponse = {
        _id: userId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        password: 'SecretPassword_2',
        provider: 'email',
        providerId: userId,
        otp: 4593,
        isVerified: false,
        isAdmin: false,
        __v: 0
      };

      User.findById = jest.fn().mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(mockResponse)
      }));

      const result = await userRepo.findById(userId);

      expect(result).toEqual(mockResponse);
      expect(User.findById).toHaveBeenCalledTimes(1);
      expect(User.findById).toHaveBeenCalledWith(userId);
    });

    it('should return null', async () => {
      const userId = new Types.ObjectId('123456789123456789123456');
      const mockResponse = null;

      User.findById = jest.fn().mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(mockResponse)
      }));

      const result = await userRepo.findById(userId);

      expect(result).toBeNull();
      expect(User.findById).toHaveBeenCalledTimes(1);
      expect(User.findById).toHaveBeenCalledWith(userId);
    });
  });

  describe('UserRepo.__create', () => {
    it('should return created user', async () => {
      const userId = new Types.ObjectId();
      const userData = {
        _id: userId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        password: 'SecretPassword_2',
        provider: 'email',
        providerId: userId,
        otp: 4593,
        isVerified: false,
        isAdmin: false,
        __v: 0
      } as unknown as IUser;
      const mockResponse = {
        ...userData,
        _id: new Types.ObjectId(),
        __v: 0
      };

      User.create = jest.fn().mockResolvedValue(mockResponse);

      const result = await userRepo.create(userData);

      expect(result).toEqual(mockResponse);
      expect(User.create).toHaveBeenCalledTimes(1);
      expect(User.create).toBeCalledWith(userData);
    });
  });

  describe('UserRepo.__update', () => {
    it('should return updated user', async () => {
      const userId = new Types.ObjectId();
      const updateQuery = {
        firstName: 'Donald'
      };

      const mockResponse = {
        _id: userId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        password: 'SecretPassword_2',
        provider: 'email',
        providerId: userId,
        otp: 4593,
        isVerified: false,
        isAdmin: false,
        __v: 0
      };

      User.findByIdAndUpdate = jest.fn().mockImplementation(() => {
        mockResponse.firstName = updateQuery.firstName;
        return mockResponse;
      });

      const result = await userRepo.update(userId, updateQuery);

      expect(result).toEqual(mockResponse);
      expect(User.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId, updateQuery, {
        new: true
      });
    });

    it('should return null', async () => {
      const userId = new Types.ObjectId('123456789123456789123456');
      const updateQuery = {
        firstName: 'Donald'
      };
      const mockResponse = null;

      User.findByIdAndUpdate = jest.fn().mockResolvedValue(mockResponse);

      const result = await userRepo.update(userId, updateQuery);

      expect(result).toBeNull();
      expect(User.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId, updateQuery, {
        new: true
      });
    });
  });

  describe('UserRepo.__delete', () => {
    it('should return removed user', async () => {
      const userId = new Types.ObjectId();
      const mockResponse = {
        _id: userId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        password: 'SecretPassword_2',
        provider: 'email',
        providerId: userId,
        otp: 4593,
        isVerified: false,
        isAdmin: false,
        __v: 0
      };

      User.findByIdAndRemove = jest.fn().mockResolvedValue(mockResponse);

      const result = await userRepo.delete(userId);

      expect(result).toEqual(mockResponse);
      expect(User.findByIdAndRemove).toHaveBeenCalledTimes(1);
      expect(User.findByIdAndRemove).toBeCalledWith(userId);
    });

    it('should return null', async () => {
      const userId = new Types.ObjectId('123456789123456789123456');
      const mockResponse = null;

      User.findByIdAndRemove = jest.fn().mockResolvedValue(mockResponse);

      const result = await userRepo.delete(userId);

      expect(result).toBeNull();
      expect(User.findByIdAndRemove).toHaveBeenCalledTimes(1);
      expect(User.findByIdAndRemove).toHaveBeenCalledWith(userId);
    });
  });
});
