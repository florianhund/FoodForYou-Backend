import { Types } from 'mongoose';

import { MealRepository as MealRepo } from '..';
import { Meal } from '../../models';
import { IMeal } from '../../interfaces/models';

const mealRepo = new MealRepo();

describe('MealRepo', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('MealRepo.__findAll', () => {
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
          }
        },
        {
          _id: new Types.ObjectId(),
          name: 'pasta',
          price: 10,
          rating: 6,
          calories: 300,
          description: 'tasty pasta',
          restaurant: {
            id: new Types.ObjectId()
          }
        }
      ];

      Meal.find = jest.fn().mockImplementation(() => ({
        sort: jest.fn().mockImplementation(() => ({
          select: jest.fn().mockResolvedValue(mockResponse)
        }))
      }));

      const result = await mealRepo.findAll();

      expect(result).toEqual(mockResponse);
      expect(Meal.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('MealRepo.__find', () => {
    it('should return meals', async () => {
      const query = { rating: { $gte: 7 } };
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
          }
        }
      ];

      Meal.find = jest.fn().mockImplementation(() => ({
        sort: jest.fn().mockImplementation(() => ({
          select: jest.fn().mockResolvedValue(mockResponse)
        }))
      }));

      const result = await mealRepo.find(query);

      expect(result).toEqual(mockResponse);
      expect(Meal.find).toHaveBeenCalledTimes(1);
      expect(Meal.find).toHaveBeenCalledWith(query);
    });
  });

  describe('MealRepo.__findById', () => {
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
        }
      };

      Meal.findById = jest.fn().mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(mockResponse)
      }));

      const result = await mealRepo.findById(mealId);

      expect(result).toEqual(mockResponse);
      expect(Meal.findById).toHaveBeenCalledTimes(1);
      expect(Meal.findById).toHaveBeenCalledWith(mealId);
    });

    it('should return null', async () => {
      const mealId = new Types.ObjectId('123456789123456789123456');
      const mockResponse = null;

      Meal.findById = jest.fn().mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(mockResponse)
      }));

      const result = await mealRepo.findById(mealId);

      expect(result).toBeNull();
      expect(Meal.findById).toHaveBeenCalledTimes(1);
      expect(Meal.findById).toHaveBeenCalledWith(mealId);
    });
  });

  describe('MealRepo.__create', () => {
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
        }
      } as unknown as IMeal;
      const mockResponse = {
        ...mealData,
        _id: new Types.ObjectId(),
        __v: 0
      };

      Meal.create = jest.fn().mockResolvedValue(mockResponse);

      const result = await mealRepo.create(mealData);

      expect(result).toEqual(mockResponse);
      expect(Meal.create).toHaveBeenCalledTimes(1);
      expect(Meal.create).toBeCalledWith(mealData);
    });
  });

  describe('MealRepo.__update', () => {
    it('should return updated meal', async () => {
      const mealId = new Types.ObjectId();
      const updateQuery = {
        name: 'pizza tonno'
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
        __v: 0
      };

      Meal.findByIdAndUpdate = jest.fn().mockImplementation(() => {
        mockResponse.name = updateQuery.name;
        return mockResponse;
      });

      const result = await mealRepo.update(mealId, updateQuery);

      expect(result).toEqual(mockResponse);
      expect(Meal.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(Meal.findByIdAndUpdate).toHaveBeenCalledWith(mealId, updateQuery, {
        new: true
      });
    });

    it('should return null', async () => {
      const mealId = new Types.ObjectId('123456789123456789123456');
      const updateQuery = {
        price: 11
      };
      const mockResponse = null;

      Meal.findByIdAndUpdate = jest.fn().mockResolvedValue(mockResponse);

      const result = await mealRepo.update(mealId, updateQuery);

      expect(result).toBeNull();
      expect(Meal.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(Meal.findByIdAndUpdate).toHaveBeenCalledWith(mealId, updateQuery, {
        new: true
      });
    });
  });

  describe('MealRepo.__delete', () => {
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
        __v: 0
      };

      Meal.findByIdAndRemove = jest.fn().mockResolvedValue(mockResponse);

      const result = await mealRepo.delete(mealId);

      expect(result).toEqual(mockResponse);
      expect(Meal.findByIdAndRemove).toHaveBeenCalledTimes(1);
      expect(Meal.findByIdAndRemove).toBeCalledWith(mealId);
    });

    it('should return null', async () => {
      const mealId = new Types.ObjectId('123456789123456789123456');
      const mockResponse = null;

      Meal.findByIdAndRemove = jest.fn().mockResolvedValue(mockResponse);

      const result = await mealRepo.delete(mealId);

      expect(result).toBeNull();
      expect(Meal.findByIdAndRemove).toHaveBeenCalledTimes(1);
      expect(Meal.findByIdAndRemove).toHaveBeenCalledWith(mealId);
    });
  });
});
