import { Types } from 'mongoose';

import { RestaurantRepository } from '../../repositories';
import { RestaurantService } from '../../services';
import RestaurantController from '../RestaurantController';
import { HttpError } from '../../utils';
import {
  getMockedRequest,
  getMockedResponse
} from '../../../../../__tests__/utils';
import { IRestaurant } from '../../interfaces/models';
import { IHttpError } from '../../interfaces';

const restaurantService = new RestaurantService(new RestaurantRepository());
const restaurantController = new RestaurantController(restaurantService);

jest.mock('../../services');
const mockedRestaurantService = jest.mocked(restaurantService, true);

describe('RestaurantController', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('RestaurantController.__getRestaurants', () => {
    it('should send 200 response with empty query', async () => {
      const mockRestaurants = [
        {
          _id: new Types.ObjectId(),
          name: 'restaurant',
          rating: 7,
          postalCode: 6060,
          address: 'hallstraße',
          __v: 0
        },
        {
          _id: new Types.ObjectId(),
          name: 'some restaurant',
          rating: 5,
          postalCode: 6060,
          address: 'hallstraße',
          __v: 0
        },
        {
          _id: new Types.ObjectId(),
          name: 'some other restaurant',
          rating: 8,
          postalCode: 6060,
          address: 'hallstraße',
          __v: 0
        }
      ] as IRestaurant[];
      const mockResponse: [IRestaurant[], undefined] = [
        mockRestaurants,
        undefined
      ];

      const mReq = getMockedRequest();
      const mRes = getMockedResponse();
      // restaurantService.getById = jest.fn().mockResolvedValue(mockResponse);
      mockedRestaurantService.getAll.mockResolvedValue(mockResponse);

      await restaurantController.routes[0].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({ data: mockRestaurants });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });

    it('should send 200 response with', async () => {
      const mockRestaurants = [
        {
          _id: new Types.ObjectId(),
          name: 'restaurant',
          rating: 7,
          postalCode: 6060,
          address: 'hallstraße',
          __v: 0
        },
        {
          _id: new Types.ObjectId(),
          name: 'some restaurant',
          rating: 5,
          postalCode: 6060,
          address: 'hallstraße',
          __v: 0
        },
        {
          _id: new Types.ObjectId(),
          name: 'some other restaurant',
          rating: 8,
          postalCode: 6060,
          address: 'hallstraße',
          __v: 0
        }
      ] as IRestaurant[];
      const mockResponse: [IRestaurant[], undefined] = [
        mockRestaurants,
        undefined
      ];

      const mReq = getMockedRequest(
        {},
        {},
        { min_rating: 7, sort_by: '-name' }
      );
      const mRes = getMockedResponse();
      // restaurantService.getById = jest.fn().mockResolvedValue(mockResponse);
      mockedRestaurantService.get.mockResolvedValue(mockResponse);

      await restaurantController.routes[0].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({ data: mockRestaurants });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });

    it('should return 500 error with empty query', async () => {
      const mockError = new HttpError(
        'Restaurant was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest();
      const mRes = getMockedResponse();
      mockedRestaurantService.getAll.mockResolvedValue(mockResponse);

      await restaurantController.routes[0].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(500);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({
        message: mockError.message,
        code: mockError.statusCode,
        status: mockError.statusMessage
      });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });

    it('should return 500 error', async () => {
      const mockError = new HttpError(
        'Restaurant was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({}, {}, { min_rating: 7 });
      const mRes = getMockedResponse();
      mockedRestaurantService.get.mockResolvedValue(mockResponse);

      await restaurantController.routes[0].handler(mReq, mRes);

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

  describe('RestaurantController.__getRestaurantById', () => {
    it('should send 200 response', async () => {
      const restaurantId = new Types.ObjectId();
      const mockRestaurant = {
        _id: restaurantId,
        name: 'il mondo',
        rating: 7,
        postalCode: 6060,
        address: 'hallstraße',
        __v: 0
      } as IRestaurant;
      const mockResponse: [IRestaurant, undefined] = [
        mockRestaurant,
        undefined
      ];

      const mReq = getMockedRequest({ id: restaurantId.toString() });
      const mRes = getMockedResponse();
      // restaurantService.getById = jest.fn().mockResolvedValue(mockResponse);
      mockedRestaurantService.getById.mockResolvedValue(mockResponse);

      await restaurantController.routes[2].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({ data: mockRestaurant });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });

    it('should return 500 error', async () => {
      const mockError = new HttpError(
        'Restaurant was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest();
      const mRes = getMockedResponse();
      mockedRestaurantService.getById.mockResolvedValue(mockResponse);

      await restaurantController.routes[2].handler(mReq, mRes);

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

  describe('RestaurantController.__createRestaurant', () => {
    it('should send 201 response', async () => {
      const restaurant = {
        name: 'il mondo',
        rating: 7,
        postalCode: 6060,
        address: 'hallstraße'
      } as IRestaurant;
      const mockResponse: [IRestaurant, undefined] = [restaurant, undefined];

      const mReq = getMockedRequest({}, { ...restaurant });
      const mRes = getMockedResponse();
      mockedRestaurantService.create.mockResolvedValue(mockResponse);

      await restaurantController.routes[1].handler(mReq, mRes);

      expect(mRes.sendStatus).toHaveBeenCalledWith(201);
      expect(mRes.sendStatus).toHaveBeenCalledTimes(1);
    });

    it('should send 500 error', async () => {
      const restaurant = {
        name: 'il mondo',
        rating: 7,
        postalCode: 6060,
        address: 'hallstraße'
      } as IRestaurant;
      const mockError = new HttpError(
        'Restaurant was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({}, { ...restaurant });
      const mRes = getMockedResponse();
      // restaurantService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedRestaurantService.create.mockResolvedValue(mockResponse);

      await restaurantController.routes[1].handler(mReq, mRes);

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

  describe('RestaurantController.__updateRestaurant', () => {
    it('should send 204 response', async () => {
      const restaurantId = new Types.ObjectId();
      const updateQuery = { rating: 8 };
      const mockRestaurant = {
        _id: restaurantId,
        name: 'il mondo',
        rating: 7,
        postalCode: 6060,
        address: 'hallstraße',
        __v: 0
      } as IRestaurant;
      const mockResponse: [IRestaurant, undefined] = [
        mockRestaurant,
        undefined
      ];

      const mReq = getMockedRequest(
        { id: restaurantId.toString() },
        { updateQuery }
      );
      const mRes = getMockedResponse();
      mockedRestaurantService.update.mockImplementation(() => {
        mockRestaurant.rating = updateQuery.rating;
        return Promise.resolve(mockResponse);
      });

      await restaurantController.routes[3].handler(mReq, mRes);

      expect(mRes.sendStatus).toHaveBeenCalledWith(204);
      expect(mRes.sendStatus).toHaveBeenCalledTimes(1);
    });

    it('should send 404 error', async () => {
      const restaurantId = new Types.ObjectId('123456789123456789123456');
      const mockError = new HttpError(
        'No restaurant with specified id was found.',
        404,
        'NOT_FOUND'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({ id: restaurantId });
      const mRes = getMockedResponse();
      // restaurantService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedRestaurantService.update.mockResolvedValue(mockResponse);

      await restaurantController.routes[3].handler(mReq, mRes);

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
      const restaurantId = new Types.ObjectId();
      const mockError = new HttpError(
        'Restaurant was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({ id: restaurantId });
      const mRes = getMockedResponse();
      // restaurantService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedRestaurantService.update.mockResolvedValue(mockResponse);

      await restaurantController.routes[3].handler(mReq, mRes);

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

  describe('RestaurantController.__deleteRestaurant', () => {
    it('should return 204', async () => {
      const restaurantId = new Types.ObjectId();
      const mockRestaurant = {
        _id: restaurantId,
        name: 'il mondo',
        rating: 7,
        postalCode: 6060,
        address: 'hallstraße',
        __v: 0
      } as IRestaurant;
      const mockResponse: [IRestaurant, undefined] = [
        mockRestaurant,
        undefined
      ];

      const mReq = getMockedRequest({ id: restaurantId });
      const mRes = getMockedResponse();
      // restaurantService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedRestaurantService.delete.mockResolvedValue(mockResponse);

      await restaurantController.routes[4].handler(mReq, mRes);

      expect(mRes.sendStatus).toHaveBeenCalledWith(204);
      expect(mRes.sendStatus).toHaveBeenCalledTimes(1);
    });

    it('should return 404', async () => {
      const restaurantId = new Types.ObjectId('123456789123456789123456');
      const mockError = new HttpError(
        'No restaurant with specified id was found.',
        404,
        'NOT_FOUND'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({ id: restaurantId });
      const mRes = getMockedResponse();
      // restaurantService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedRestaurantService.delete.mockResolvedValue(mockResponse);

      await restaurantController.routes[4].handler(mReq, mRes);

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
      const restaurantId = new Types.ObjectId();
      const mockError = new HttpError(
        'Restaurant was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({ id: restaurantId });
      const mRes = getMockedResponse();
      // restaurantService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedRestaurantService.delete.mockResolvedValue(mockResponse);

      await restaurantController.routes[4].handler(mReq, mRes);

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
