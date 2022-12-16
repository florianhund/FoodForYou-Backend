import { Types } from 'mongoose';

import { MealRepository } from '../../repositories';
import { MealService } from '../../services';
import MealController from '../MealController';
import { HttpError } from '../../utils';
import {
  getMockedRequest,
  getMockedResponse
} from '../../../../../__tests__/utils';
import { IMeal } from '../../interfaces/models';
import { IHttpError } from '../../interfaces';

const mealService = new MealService(new MealRepository());
const mealController = new MealController(mealService);

jest.mock('../../services');
const mockedMealService = jest.mocked(mealService, true);

describe('MealController', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('MealController.__getMeals', () => {
    it('should send 200 response with empty query', async () => {
      const mockMeals = [
        {
          _id: new Types.ObjectId(),
          name: 'pizza',
          price: 8,
          rating: 3,
          calories: 600,
          description: 'tasty pizza',
          restaurant: {
            id: new Types.ObjectId()
          }
        },
        {
          _id: new Types.ObjectId(),
          name: 'pizza',
          price: 8,
          rating: 3,
          calories: 600,
          description: 'tasty pizza',
          restaurant: {
            id: new Types.ObjectId()
          }
        },
        {
          _id: new Types.ObjectId(),
          name: 'pizza',
          price: 8,
          rating: 3,
          calories: 600,
          description: 'tasty pizza',
          restaurant: {
            id: new Types.ObjectId()
          }
        }
      ] as unknown as IMeal[];
      const mockResponse: [IMeal[], undefined] = [mockMeals, undefined];

      const mReq = getMockedRequest();
      const mRes = getMockedResponse();
      // mealService.getById = jest.fn().mockResolvedValue(mockResponse);
      mockedMealService.getAll.mockResolvedValue(mockResponse);

      await mealController.routes[0].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({ data: mockMeals });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });

    it('should send 200 response with query', async () => {
      const mockMeals = [
        {
          _id: new Types.ObjectId(),
          name: 'pizza',
          price: 8,
          rating: 3,
          calories: 600,
          description: 'tasty pizza',
          restaurant: {
            id: new Types.ObjectId()
          }
        },
        {
          _id: new Types.ObjectId(),
          name: 'pizza',
          price: 8,
          rating: 3,
          calories: 600,
          description: 'tasty pizza',
          restaurant: {
            id: new Types.ObjectId()
          }
        },
        {
          _id: new Types.ObjectId(),
          name: 'pizza',
          price: 8,
          rating: 3,
          calories: 600,
          description: 'tasty pizza',
          restaurant: {
            id: new Types.ObjectId()
          }
        }
      ] as unknown as IMeal[];
      const mockResponse: [IMeal[], undefined] = [mockMeals, undefined];

      const mReq = getMockedRequest(
        {},
        {},
        { min_rating: 7, sort_by: '-name' }
      );
      const mRes = getMockedResponse();
      // mealService.getById = jest.fn().mockResolvedValue(mockResponse);
      mockedMealService.get.mockResolvedValue(mockResponse);

      await mealController.routes[0].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({ data: mockMeals });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });

    it('should return 500 error with empty query', async () => {
      const mockError = new HttpError(
        'Meal was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest();
      const mRes = getMockedResponse();
      mockedMealService.getAll.mockResolvedValue(mockResponse);

      await mealController.routes[0].handler(mReq, mRes);

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
        'Meal was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({}, {}, { min_rating: 7 });
      const mRes = getMockedResponse();
      mockedMealService.get.mockResolvedValue(mockResponse);

      await mealController.routes[0].handler(mReq, mRes);

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

  describe('MealController.__getMealById', () => {
    it('should send 200 response', async () => {
      const mealId = new Types.ObjectId();
      const mockMeal = {
        _id: new Types.ObjectId(),
        name: 'pizza',
        price: 8,
        rating: 3,
        calories: 600,
        description: 'tasty pizza',
        restaurant: {
          id: new Types.ObjectId()
        }
      } as unknown as IMeal;
      const mockResponse: [IMeal, undefined] = [mockMeal, undefined];

      const mReq = getMockedRequest({ id: mealId.toString() });
      const mRes = getMockedResponse();
      // mealService.getById = jest.fn().mockResolvedValue(mockResponse);
      mockedMealService.getById.mockResolvedValue(mockResponse);

      await mealController.routes[2].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({ data: mockMeal });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });

    it('should return 500 error', async () => {
      const mockError = new HttpError(
        'Meal was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest();
      const mRes = getMockedResponse();
      mockedMealService.getById.mockResolvedValue(mockResponse);

      await mealController.routes[2].handler(mReq, mRes);

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

  describe('MealController.__createMeal', () => {
    it('should send 201 response', async () => {
      const meal = {
        _id: new Types.ObjectId(),
        name: 'pizza',
        price: 8,
        rating: 3,
        calories: 600,
        description: 'tasty pizza',
        restaurant: {
          id: new Types.ObjectId()
        }
      } as unknown as IMeal;
      const mockResponse: [IMeal, undefined] = [meal, undefined];

      const mReq = getMockedRequest({}, { ...meal });
      const mRes = getMockedResponse();
      mockedMealService.create.mockResolvedValue(mockResponse);

      await mealController.routes[1].handler(mReq, mRes);

      expect(mRes.sendStatus).toHaveBeenCalledWith(201);
      expect(mRes.sendStatus).toHaveBeenCalledTimes(1);
    });

    it('should send 500 error', async () => {
      const meal = {
        _id: new Types.ObjectId(),
        name: 'pizza',
        price: 8,
        rating: 3,
        calories: 600,
        description: 'tasty pizza',
        restaurant: {
          id: new Types.ObjectId()
        }
      } as unknown as IMeal;
      const mockError = new HttpError(
        'Meal was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({}, { ...meal });
      const mRes = getMockedResponse();
      // mealService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedMealService.create.mockResolvedValue(mockResponse);

      await mealController.routes[1].handler(mReq, mRes);

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

  describe('MealController.__updateMeal', () => {
    it('should send 204 response', async () => {
      const mealId = new Types.ObjectId();
      const updateQuery = { rating: 8 };
      const mockMeal = {
        _id: new Types.ObjectId(),
        name: 'pizza',
        price: 8,
        rating: 3,
        calories: 600,
        description: 'tasty pizza',
        restaurant: {
          id: new Types.ObjectId()
        },
        __v: 0
      } as unknown as IMeal;
      const mockResponse: [IMeal, undefined] = [mockMeal, undefined];

      const mReq = getMockedRequest({ id: mealId.toString() }, { updateQuery });
      const mRes = getMockedResponse();
      mockedMealService.update.mockImplementation(() => {
        mockMeal.rating = updateQuery.rating;
        return Promise.resolve(mockResponse);
      });

      await mealController.routes[3].handler(mReq, mRes);

      expect(mRes.sendStatus).toHaveBeenCalledWith(204);
      expect(mRes.sendStatus).toHaveBeenCalledTimes(1);
    });

    it('should send 404 error', async () => {
      const mealId = new Types.ObjectId('123456789123456789123456');
      const mockError = new HttpError(
        'No meal with specified id was found.',
        404,
        'NOT_FOUND'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({ id: mealId });
      const mRes = getMockedResponse();
      // mealService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedMealService.update.mockResolvedValue(mockResponse);

      await mealController.routes[3].handler(mReq, mRes);

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
      const mealId = new Types.ObjectId();
      const mockError = new HttpError(
        'Meal was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({ id: mealId });
      const mRes = getMockedResponse();
      // mealService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedMealService.update.mockResolvedValue(mockResponse);

      await mealController.routes[3].handler(mReq, mRes);

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

  describe('MealController.__deleteMeal', () => {
    it('should return 204', async () => {
      const mealId = new Types.ObjectId();
      const mockMeal = {
        _id: new Types.ObjectId(),
        name: 'pizza',
        price: 8,
        rating: 3,
        calories: 600,
        description: 'tasty pizza',
        restaurant: {
          id: new Types.ObjectId()
        }
      } as unknown as IMeal;
      const mockResponse: [IMeal, undefined] = [mockMeal, undefined];

      const mReq = getMockedRequest({ id: mealId });
      const mRes = getMockedResponse();
      // mealService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedMealService.delete.mockResolvedValue(mockResponse);

      await mealController.routes[4].handler(mReq, mRes);

      expect(mRes.sendStatus).toHaveBeenCalledWith(204);
      expect(mRes.sendStatus).toHaveBeenCalledTimes(1);
    });

    it('should return 404', async () => {
      const mealId = new Types.ObjectId('123456789123456789123456');
      const mockError = new HttpError(
        'No meal with specified id was found.',
        404,
        'NOT_FOUND'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({ id: mealId });
      const mRes = getMockedResponse();
      // mealService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedMealService.delete.mockResolvedValue(mockResponse);

      await mealController.routes[4].handler(mReq, mRes);

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
      const mealId = new Types.ObjectId();
      const mockError = new HttpError(
        'Meal was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({ id: mealId });
      const mRes = getMockedResponse();
      // restaurantService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedMealService.delete.mockResolvedValue(mockResponse);

      await mealController.routes[4].handler(mReq, mRes);

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
