import { Types } from 'mongoose';

import { UserRepository } from '../../repositories';
import { UserService } from '..';
import { IUser } from '../../interfaces/models';
import Mailer from '../../../../config/Mailer';
import { HttpError } from '../../utils';

const userRepo = new UserRepository();
const userService = new UserService(userRepo);

jest.mock('../../repositories');
jest.mock('../../../../config/Mailer');
const mockedUserRepo = jest.mocked(userRepo, true);

describe('UserService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('UserService.__getAll', () => {
    it('should return users', async () => {
      const mockResponse = [
        {
          _id: new Types.ObjectId(),
          firstName: 'Florian',
          lastName: 'Hundegger',
          email: 'flo.hundegger@gmail.com',
          password: 'SevretPassword_2',
          provider: 'email',
          providerId: new Types.ObjectId(),
          otp: 3083,
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
          otp: 3083,
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
          otp: 3083,
          isVerified: false,
          isAdmin: false
        }
      ] as unknown as IUser[];

      mockedUserRepo.findAll.mockResolvedValue(mockResponse);

      const [users, error] = await userService.getAll();

      expect(users).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedUserRepo.findAll).toHaveBeenCalledTimes(1);
      expect(mockedUserRepo.findAll).toHaveBeenCalledWith('', undefined);
    });

    it('should return 500', async () => {
      const mockResponse = null;

      mockedUserRepo.findAll.mockRejectedValue(mockResponse);

      const [users, error] = await userService.getAll();

      expect(users).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedUserRepo.findAll).toHaveBeenCalledTimes(1);
      expect(mockedUserRepo.findAll).toHaveBeenCalledWith('', undefined);
    });
  });

  describe('UserService.__getById', () => {
    it('should return user', async () => {
      const userId = new Types.ObjectId();
      const mockResponse = {
        _id: new Types.ObjectId(),
        firstName: 'Florian',
        lastName: 'Hundegger',
        email: 'flo.hundegger@gmail.com',
        password: 'SevretPassword_2',
        provider: 'email',
        providerId: new Types.ObjectId(),
        otp: 3083,
        isVerified: false,
        isAdmin: false
      } as unknown as IUser;

      mockedUserRepo.findById.mockResolvedValue(mockResponse);

      const [users, error] = await userService.getById(userId.toString());

      expect(users).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedUserRepo.findById).toHaveBeenCalledTimes(1);
      expect(mockedUserRepo.findById).toHaveBeenCalledWith(userId, undefined);
    });

    it('should return 500 error', async () => {
      const userId = new Types.ObjectId();
      const mockUser = null;

      mockedUserRepo.findById.mockRejectedValue(mockUser);

      const [user, error] = await userService.getById(userId.toString());

      expect(user).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedUserRepo.findById).toHaveBeenCalledTimes(1);
      expect(mockedUserRepo.findById).toHaveBeenCalledWith(userId, undefined);
    });
  });

  describe('UserService.__create', () => {
    it('should return created user', async () => {
      const userData = {
        firstName: 'Florian',
        lastName: 'Hundegger',
        email: 'flo.hundegger@gmail.com',
        password: 'SevretPassword_2'
      } as unknown as IUser;
      const mockResponse = {
        ...userData,
        _id: new Types.ObjectId(),
        __v: 0
      } as IUser;

      mockedUserRepo.create.mockResolvedValue(mockResponse);

      const [user, error] = await userService.create(userData);

      expect(user).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedUserRepo.create).toHaveBeenCalledTimes(1);
    });

    it('should return 500', async () => {
      const userData = {
        firstName: 'Florian',
        lastName: 'Hundegger',
        email: 'flo.hundegger@gmail.com',
        password: 'SevretPassword_2'
      } as unknown as IUser;
      const mockResponse = null;

      mockedUserRepo.create.mockRejectedValue(mockResponse);

      const [user, error] = await userService.create(userData);

      expect(user).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedUserRepo.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('UserService.__update', () => {
    it('should return updated user', async () => {
      const userId = new Types.ObjectId();
      const updateQuery = {
        email: 'john.doe@gmail.com'
      };
      const mockResponse = {
        _id: new Types.ObjectId(),
        firstName: 'Florian',
        lastName: 'Hundegger',
        email: 'flo.hundegger@gmail.com',
        password: 'SevretPassword_2',
        provider: 'email',
        providerId: new Types.ObjectId(),
        otp: 3083,
        isVerified: false,
        isAdmin: false
      } as unknown as IUser;

      mockedUserRepo.update.mockImplementation(() => {
        mockResponse.email = updateQuery.email;
        return Promise.resolve(mockResponse);
      });

      const [user, error] = await userService.update(
        userId.toString(),
        updateQuery
      );

      expect(user).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedUserRepo.update).toHaveBeenCalledTimes(1);
      expect(mockedUserRepo.update).toHaveBeenCalledWith(userId, updateQuery);
    });

    it('should return 404 error', async () => {
      const userId = new Types.ObjectId('123456789123456789123456');
      const updateQuery = {
        email: 'john.doe@gmail.com'
      };
      const mockUser = null;

      mockedUserRepo.update.mockResolvedValue(mockUser);

      const [user, error] = await userService.update(
        userId.toString(),
        updateQuery
      );

      expect(user).toBeNull();
      expect(error?.statusCode).toBe(404);
      expect(mockedUserRepo.update).toHaveBeenCalledTimes(1);
      expect(mockedUserRepo.update).toHaveBeenCalledWith(userId, updateQuery);
    });

    it('should return 500 error', async () => {
      const userId = new Types.ObjectId('123456789123456789123456');
      const updateQuery = {
        email: 'john.doe@gmail.com'
      };
      const mockUser = null;

      mockedUserRepo.update.mockRejectedValue(mockUser);

      const [user, error] = await userService.update(
        userId.toString(),
        updateQuery
      );

      expect(user).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedUserRepo.update).toHaveBeenCalledTimes(1);
      expect(mockedUserRepo.update).toHaveBeenCalledWith(userId, updateQuery);
    });
  });

  describe('UserService.__delete', () => {
    it('should return removed user', async () => {
      const userId = new Types.ObjectId();
      const mockResponse = {
        _id: new Types.ObjectId(),
        firstName: 'Florian',
        lastName: 'Hundegger',
        email: 'flo.hundegger@gmail.com',
        password: 'SevretPassword_2',
        provider: 'email',
        providerId: new Types.ObjectId(),
        otp: 3083,
        isVerified: false,
        isAdmin: false
      } as unknown as IUser;

      mockedUserRepo.delete.mockResolvedValue(mockResponse);

      const [user, error] = await userService.delete(userId.toString());

      expect(user).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedUserRepo.delete).toHaveBeenCalledTimes(1);
      expect(mockedUserRepo.delete).toHaveBeenCalledWith(userId);
    });

    it('should return 404 error', async () => {
      const userId = new Types.ObjectId('123456789123456789123456');
      const mockUser = null;

      mockedUserRepo.delete.mockResolvedValue(mockUser);

      const [user, error] = await userService.delete(userId.toString());

      expect(user).toBeNull();
      expect(error?.statusCode).toBe(404);
      expect(mockedUserRepo.delete).toHaveBeenCalledTimes(1);
      expect(mockedUserRepo.delete).toHaveBeenCalledWith(userId);
    });

    it('should return 500 error', async () => {
      const userId = new Types.ObjectId();
      const mockUser = null;

      mockedUserRepo.delete.mockRejectedValue(mockUser);

      const [user, error] = await userService.delete(userId.toString());

      expect(user).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedUserRepo.delete).toHaveBeenCalledTimes(1);
      expect(mockedUserRepo.delete).toHaveBeenCalledWith(userId);
    });
  });

  describe('UserService.__sendVerificationMail', () => {
    it('should return no error', async () => {
      const userId = new Types.ObjectId();
      const mockUser = {
        _id: new Types.ObjectId(),
        firstName: 'Florian',
        lastName: 'Hundegger',
        email: 'flo.hundegger@gmail.com',
        password: 'SevretPassword_2',
        provider: 'email',
        providerId: new Types.ObjectId(),
        otp: 4022,
        isVerified: false,
        isAdmin: false
      } as unknown as IUser;

      userService.getById = jest.fn().mockResolvedValue([mockUser, undefined]);

      const [success, error] = await userService.sendVerificationMail(
        userId.toString()
      );

      expect(success).toBe(true);
      expect(error).toBeUndefined();
      expect(userService.getById).toHaveBeenCalledTimes(1);
      expect(userService.getById).toHaveBeenCalledWith(userId.toString());
      expect(Mailer).toHaveBeenCalledTimes(1);
      expect(
        jest.mocked(Mailer).mock.instances[0].sendVerification
      ).toHaveBeenCalledTimes(1);
      expect(
        jest.mocked(Mailer).mock.instances[0].sendVerification
      ).toHaveBeenCalledWith(mockUser.email, mockUser.otp);
    });

    it('should return 404 error', async () => {
      const userId = new Types.ObjectId('123456789123456789123456');
      const mockUser = null;

      userService.getById = jest
        .fn()
        .mockResolvedValue([
          mockUser,
          new HttpError('user not found', 404, 'INVALID_ID')
        ]);

      const [success, error] = await userService.sendVerificationMail(
        userId.toString()
      );

      expect(success).toBe(false);
      expect(error?.statusCode).toBe(404);
      expect(userService.getById).toHaveBeenCalledTimes(1);
      expect(userService.getById).toHaveBeenCalledWith(userId.toString());
      expect(Mailer).toHaveBeenCalledTimes(1);
      expect(
        jest.mocked(Mailer).mock.instances[0].sendVerification
      ).not.toHaveBeenCalled();
    });

    it('should return 500 error', async () => {
      const userId = new Types.ObjectId();
      const mockUser = null;

      userService.getById = jest
        .fn()
        .mockRejectedValue([
          mockUser,
          new HttpError('something went wrong', 500, 'INTERNAL_SERVER_ERROR')
        ]);

      const [success, error] = await userService.sendVerificationMail(
        userId.toString()
      );

      expect(success).toBe(false);
      expect(error?.statusCode).toBe(500);
      expect(userService.getById).toHaveBeenCalledTimes(1);
      expect(userService.getById).toHaveBeenCalledWith(userId.toString());
      expect(Mailer).toHaveBeenCalledTimes(1);
      expect(
        jest.mocked(Mailer).mock.instances[0].sendVerification
      ).not.toHaveBeenCalled();
    });
  });

  describe('UserService.__verifyUser', () => {
    it('should return no error', async () => {
      const userId = new Types.ObjectId();
      const userOtp = 3083;
      const mockUser = {
        _id: new Types.ObjectId(),
        firstName: 'Florian',
        lastName: 'Hundegger',
        email: 'flo.hundegger@gmail.com',
        password: 'SevretPassword_2',
        provider: 'email',
        providerId: new Types.ObjectId(),
        otp: userOtp,
        isVerified: false,
        isAdmin: false
      } as unknown as IUser;

      userService.getById = jest.fn().mockResolvedValue([mockUser, undefined]);
      userService.update = jest.fn().mockResolvedValue([mockUser, undefined]);

      const [success, error] = await userService.verifiyUser(
        userId.toString(),
        userOtp.toString()
      );

      expect(success).toBe(true);
      expect(error).toBeUndefined();
      expect(userService.getById).toHaveBeenCalledTimes(1);
      expect(userService.getById).toHaveBeenCalledWith(userId.toString());
      expect(userService.update).toHaveBeenCalledTimes(1);
      expect(userService.update).toHaveBeenCalledWith(userId.toString(), {
        isVerified: true,
        otp: null
      });
    });

    it('should return 401 error', async () => {
      const userId = new Types.ObjectId();
      const userOtp = 3083;
      const mockUser = {
        _id: new Types.ObjectId(),
        firstName: 'Florian',
        lastName: 'Hundegger',
        email: 'flo.hundegger@gmail.com',
        password: 'SevretPassword_2',
        provider: 'email',
        providerId: new Types.ObjectId(),
        otp: userOtp,
        isVerified: false,
        isAdmin: false
      } as unknown as IUser;

      userService.getById = jest.fn().mockResolvedValue([mockUser, undefined]);
      userService.update = jest.fn().mockResolvedValue([mockUser, undefined]);

      const [success, error] = await userService.verifiyUser(
        userId.toString(),
        '1234'
      );

      expect(success).toBe(false);
      expect(error?.statusCode).toBe(401);
      expect(userService.getById).toHaveBeenCalledTimes(1);
      expect(userService.getById).toHaveBeenCalledWith(userId.toString());
      expect(userService.update).not.toHaveBeenCalled();
    });

    it('should return 404 error', async () => {
      const userId = new Types.ObjectId('123456789123456789123456');
      const userOtp = 3083;
      const mockUser = null;

      userService.getById = jest
        .fn()
        .mockResolvedValue([
          mockUser,
          new HttpError('user not found', 404, 'INVALID_ID')
        ]);
      userService.update = jest.fn().mockResolvedValue([mockUser, undefined]);

      const [success, error] = await userService.verifiyUser(
        userId.toString(),
        userOtp.toString()
      );

      expect(success).toBe(false);
      expect(error?.statusCode).toBe(404);
      expect(userService.getById).toHaveBeenCalledTimes(1);
      expect(userService.getById).toHaveBeenCalledWith(userId.toString());
      expect(userService.update).not.toHaveBeenCalled();
    });

    it('should return 500 error', async () => {
      const userId = new Types.ObjectId();
      const userOtp = 3083;
      const mockUser = null;

      userService.getById = jest
        .fn()
        .mockRejectedValue([
          mockUser,
          new HttpError('something went worng', 500, 'INTERNAL_SERVER_ERROR')
        ]);
      userService.update = jest.fn().mockResolvedValue([mockUser, undefined]);

      const [success, error] = await userService.verifiyUser(
        userId.toString(),
        userOtp.toString()
      );

      expect(success).toBe(false);
      expect(error?.statusCode).toBe(500);
      expect(userService.getById).toHaveBeenCalledTimes(1);
      expect(userService.getById).toHaveBeenCalledWith(userId.toString());
      expect(userService.update).not.toHaveBeenCalled();
    });
  });
});
