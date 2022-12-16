import { Types } from 'mongoose';

import { MealRepository } from '../../repositories';
import { MealService } from '..';
import { IMeal } from '../../interfaces/models';

const mealRepo = new MealRepository();
const mealService = new MealService(mealRepo);

jest.mock('../../repositories');
const mockedMealRepo = jest.mocked(mealRepo, true);

describe('MealService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('MealService.__getAll', () => {
    it('should return meals', async () => {
      const mockResponse = [
        {
          _id: new Types.ObjectId(),
          name: 'pizza',
          price: 8,
          rating: 3,
          calories: 600,
          description: 'tasty pizza',
          restaurant: {
            id: new Types.ObjectId()
          },
          tags: ['pizza'],
          images: [],
          allergenics: ['A', 'E']
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
          },
          tags: ['pizza'],
          images: [],
          allergenics: ['A', 'E']
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
          },
          tags: ['pizza'],
          images: [],
          allergenics: ['A', 'E']
        }
      ] as unknown as IMeal[];

      mockedMealRepo.findAll.mockResolvedValue(mockResponse);

      const [meals, error] = await mealService.getAll();

      expect(meals).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedMealRepo.findAll).toHaveBeenCalledTimes(1);
      expect(mockedMealRepo.findAll).toHaveBeenCalledWith('', undefined);
    });

    it('should return 500', async () => {
      const mockResponse = null;

      mockedMealRepo.findAll.mockRejectedValue(mockResponse);

      const [meals, error] = await mealService.getAll();

      expect(meals).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedMealRepo.findAll).toHaveBeenCalledTimes(1);
      expect(mockedMealRepo.findAll).toHaveBeenCalledWith('', undefined);
    });
  });

  describe('MealService.__get', () => {
    it('should return meals', async () => {
      const query = { minRating: 7 };
      const mockResponse = [
        {
          _id: new Types.ObjectId(),
          name: 'pizza',
          price: 8,
          rating: 3,
          calories: 600,
          description: 'tasty pizza',
          restaurant: {
            id: new Types.ObjectId()
          },
          tags: ['pizza'],
          images: [],
          allergenics: ['A', 'E']
        }
      ] as unknown as IMeal[];

      mockedMealRepo.find.mockResolvedValue(mockResponse);

      const [meals, error] = await mealService.get(query);

      expect(meals).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedMealRepo.find).toHaveBeenCalledTimes(1);
    });

    it('should return 500', async () => {
      const query = { minRating: 7 };
      const mockResponse = null;

      mockedMealRepo.find.mockRejectedValue(mockResponse);

      const [meals, error] = await mealService.get(query);

      expect(meals).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedMealRepo.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('MealService.__getById', () => {
    it('should return meal', async () => {
      const mealId = new Types.ObjectId();
      const mockResponse = {
        _id: new Types.ObjectId(),
        name: 'pizza',
        price: 8,
        rating: 3,
        calories: 600,
        description: 'tasty pizza',
        restaurant: {
          id: new Types.ObjectId()
        },
        tags: ['pizza'],
        images: [],
        allergenics: ['A', 'E']
      } as unknown as IMeal;

      mockedMealRepo.findById.mockResolvedValue(mockResponse);

      const [meals, error] = await mealService.getById(mealId.toString());

      expect(meals).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedMealRepo.findById).toHaveBeenCalledTimes(1);
      expect(mockedMealRepo.findById).toHaveBeenCalledWith(mealId, undefined);
    });

    it('should return 500 error', async () => {
      const mealId = new Types.ObjectId();
      const mockMeal = null;

      mockedMealRepo.findById.mockRejectedValue(mockMeal);

      const [meal, error] = await mealService.getById(mealId.toString());

      expect(meal).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedMealRepo.findById).toHaveBeenCalledTimes(1);
      expect(mockedMealRepo.findById).toHaveBeenCalledWith(mealId, undefined);
    });
  });

  describe('MealService.__create', () => {
    it('should return created meal', async () => {
      const mealData = {
        _id: new Types.ObjectId(),
        name: 'pizza',
        price: 8,
        rating: 3,
        calories: 600,
        description: 'tasty pizza',
        restaurant: {
          id: new Types.ObjectId()
        },
        tags: ['pizza'],
        images: [],
        allergenics: ['A', 'E']
      } as unknown as IMeal;
      const mockResponse = {
        ...mealData,
        _id: new Types.ObjectId(),
        __v: 0
      } as IMeal;

      mockedMealRepo.create.mockResolvedValue(mockResponse);

      const [meal, error] = await mealService.create(mealData);

      expect(meal).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedMealRepo.create).toHaveBeenCalledTimes(1);
      expect(mockedMealRepo.create).toHaveBeenCalledWith(mealData);
    });

    it('should return 500', async () => {
      const mealData = {
        _id: new Types.ObjectId(),
        name: 'pizza',
        price: 8,
        rating: 3,
        calories: 600,
        description: 'tasty pizza',
        restaurant: {
          id: new Types.ObjectId()
        },
        tags: ['pizza'],
        images: [],
        allergenics: ['A', 'E']
      } as unknown as IMeal;
      const mockResponse = null;

      mockedMealRepo.create.mockRejectedValue(mockResponse);

      const [meal, error] = await mealService.create(mealData);

      expect(meal).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedMealRepo.create).toHaveBeenCalledTimes(1);
      expect(mockedMealRepo.create).toHaveBeenCalledWith(mealData);
    });
  });

  describe('MealService.__update', () => {
    it('should return updated meal', async () => {
      const mealId = new Types.ObjectId();
      const updateQuery = {
        rating: 8
      };
      const mockResponse = {
        _id: new Types.ObjectId(),
        name: 'pizza',
        price: 8,
        rating: 3,
        calories: 600,
        description: 'tasty pizza',
        restaurant: {
          id: new Types.ObjectId()
        },
        tags: ['pizza'],
        images: [],
        allergenics: ['A', 'E']
      } as unknown as IMeal;

      mockedMealRepo.update.mockImplementation(() => {
        mockResponse.rating = updateQuery.rating;
        return Promise.resolve(mockResponse);
      });

      const [meal, error] = await mealService.update(
        mealId.toString(),
        updateQuery
      );

      expect(meal).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedMealRepo.update).toHaveBeenCalledTimes(1);
      expect(mockedMealRepo.update).toHaveBeenCalledWith(mealId, updateQuery);
    });

    it('should return 404 error', async () => {
      const mealId = new Types.ObjectId('123456789123456789123456');
      const updateQuery = {
        rating: 8
      };
      const mockMeal = null;

      mockedMealRepo.update.mockResolvedValue(mockMeal);

      const [meal, error] = await mealService.update(
        mealId.toString(),
        updateQuery
      );

      expect(meal).toBeNull();
      expect(error?.statusCode).toBe(404);
      expect(mockedMealRepo.update).toHaveBeenCalledTimes(1);
      expect(mockedMealRepo.update).toHaveBeenCalledWith(mealId, updateQuery);
    });

    it('should return 500 error', async () => {
      const mealId = new Types.ObjectId('123456789123456789123456');
      const updateQuery = {
        rating: 8
      };
      const mockMeal = null;

      mockedMealRepo.update.mockRejectedValue(mockMeal);

      const [meal, error] = await mealService.update(
        mealId.toString(),
        updateQuery
      );

      expect(meal).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedMealRepo.update).toHaveBeenCalledTimes(1);
      expect(mockedMealRepo.update).toHaveBeenCalledWith(mealId, updateQuery);
    });
  });

  describe('MealService.__delete', () => {
    it('should return removed meal', async () => {
      const mealId = new Types.ObjectId();
      const mockResponse = {
        _id: new Types.ObjectId(),
        name: 'pizza',
        price: 8,
        rating: 3,
        calories: 600,
        description: 'tasty pizza',
        restaurant: {
          id: new Types.ObjectId()
        },
        tags: ['pizza'],
        images: []
      } as unknown as IMeal;

      mockedMealRepo.delete.mockResolvedValue(mockResponse);

      const [meal, error] = await mealService.delete(mealId.toString());

      expect(meal).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedMealRepo.delete).toHaveBeenCalledTimes(1);
      expect(mockedMealRepo.delete).toHaveBeenCalledWith(mealId);
    });

    it('should return 404 error', async () => {
      const mealId = new Types.ObjectId('123456789123456789123456');
      const mockMeal = null;

      mockedMealRepo.delete.mockResolvedValue(mockMeal);

      const [meal, error] = await mealService.delete(mealId.toString());

      expect(meal).toBeNull();
      expect(error?.statusCode).toBe(404);
      expect(mockedMealRepo.delete).toHaveBeenCalledTimes(1);
      expect(mockedMealRepo.delete).toHaveBeenCalledWith(mealId);
    });

    it('should return 500 error', async () => {
      const mealId = new Types.ObjectId();
      const mockMeal = null;

      mockedMealRepo.delete.mockRejectedValue(mockMeal);

      const [meal, error] = await mealService.delete(mealId.toString());

      expect(meal).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedMealRepo.delete).toHaveBeenCalledTimes(1);
      expect(mockedMealRepo.delete).toHaveBeenCalledWith(mealId);
    });
  });
});
