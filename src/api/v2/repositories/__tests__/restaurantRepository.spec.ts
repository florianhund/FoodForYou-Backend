import { Types } from 'mongoose';

import { RestaurantRepository as RestaurantRepo } from '..';
import { Restaurant } from '../../models';
import { IRestaurant } from '../../interfaces/models';

const restaurantRepo = new RestaurantRepo();

describe('RestaurantRepo', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('RestaurantRepo.__findAll', () => {
    it('should return restaurants', async () => {
      const mockResponse = [
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
      ];

      Restaurant.find = jest.fn().mockImplementation(() => ({
        sort: jest.fn().mockImplementation(() => ({
          select: jest.fn().mockResolvedValue(mockResponse)
        }))
      }));

      const result = await restaurantRepo.findAll();

      expect(result).toEqual(mockResponse);
      expect(Restaurant.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('RestaurantRepo.__find', () => {
    it('should return restaurants', async () => {
      const query = { rating: { $gte: 7 } };
      const mockResponse = [
        {
          _id: new Types.ObjectId(),
          name: 'restaurant',
          rating: 7,
          postalCode: 6060,
          address: 'hallstraße',
          __v: 0
        }
      ];

      Restaurant.find = jest.fn().mockImplementation(() => ({
        sort: jest.fn().mockImplementation(() => ({
          select: jest.fn().mockResolvedValue(mockResponse)
        }))
      }));

      const result = await restaurantRepo.find(query);

      expect(result).toEqual(mockResponse);
      expect(Restaurant.find).toHaveBeenCalledTimes(1);
      expect(Restaurant.find).toHaveBeenCalledWith(query);
    });
  });

  describe('RestaurantRepo.__findById', () => {
    it('should return restaurant', async () => {
      const restaurantId = new Types.ObjectId();
      const mockResponse = {
        _id: restaurantId,
        name: 'il mondo',
        rating: 7,
        postalCode: 6060,
        address: 'hallstraße',
        __v: 0
      };

      Restaurant.findById = jest.fn().mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(mockResponse)
      }));

      const result = await restaurantRepo.findById(restaurantId);

      expect(result).toEqual(mockResponse);
      expect(Restaurant.findById).toHaveBeenCalledTimes(1);
      expect(Restaurant.findById).toHaveBeenCalledWith(restaurantId);
    });

    it('should return null', async () => {
      const restaurantId = new Types.ObjectId('123456789123456789123456');
      const mockResponse = null;

      Restaurant.findById = jest.fn().mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(mockResponse)
      }));

      const result = await restaurantRepo.findById(restaurantId);

      expect(result).toBeNull();
      expect(Restaurant.findById).toHaveBeenCalledTimes(1);
      expect(Restaurant.findById).toHaveBeenCalledWith(restaurantId);
    });
  });

  describe('RestaurantRepo.__create', () => {
    it('should return created restaurant', async () => {
      const restaurantData = {
        name: 'il mondo',
        rating: 7,
        postalCode: 6060,
        address: 'hallstraße'
      } as IRestaurant;
      const mockResponse = {
        ...restaurantData,
        _id: new Types.ObjectId(),
        __v: 0
      };

      Restaurant.create = jest.fn().mockResolvedValue(mockResponse);

      const result = await restaurantRepo.create(restaurantData);

      expect(result).toEqual(mockResponse);
      expect(Restaurant.create).toHaveBeenCalledTimes(1);
      expect(Restaurant.create).toBeCalledWith(restaurantData);
    });
  });

  describe('RestaurantRepo.__update', () => {
    it('should return updated restaurant', async () => {
      const restaurantId = new Types.ObjectId();
      const updateQuery = {
        name: 'la taverna'
      };

      const mockResponse = {
        _id: restaurantId,
        name: 'il mondo',
        rating: 7,
        postalCode: 6060,
        address: 'hallstraße',
        __v: 0
      };

      Restaurant.findByIdAndUpdate = jest.fn().mockImplementation(() => {
        mockResponse.name = updateQuery.name;
        return mockResponse;
      });

      const result = await restaurantRepo.update(restaurantId, updateQuery);

      expect(result).toEqual(mockResponse);
      expect(Restaurant.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(Restaurant.findByIdAndUpdate).toHaveBeenCalledWith(
        restaurantId,
        updateQuery,
        { new: true }
      );
    });

    it('should return null', async () => {
      const restaurantId = new Types.ObjectId('123456789123456789123456');
      const updateQuery = {
        name: 'la taverna'
      };
      const mockResponse = null;

      Restaurant.findByIdAndUpdate = jest.fn().mockResolvedValue(mockResponse);

      const result = await restaurantRepo.update(restaurantId, updateQuery);

      expect(result).toBeNull();
      expect(Restaurant.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(Restaurant.findByIdAndUpdate).toHaveBeenCalledWith(
        restaurantId,
        updateQuery,
        { new: true }
      );
    });
  });

  describe('RestaurantRepo.__delete', () => {
    it('should return removed restaurant', async () => {
      const restaurantId = new Types.ObjectId();
      const mockResponse = {
        _id: restaurantId,
        name: 'il mondo',
        rating: 7,
        postalCode: 6060,
        address: 'hallstraße',
        __v: 0
      };

      Restaurant.findByIdAndRemove = jest.fn().mockResolvedValue(mockResponse);

      const result = await restaurantRepo.delete(restaurantId);

      expect(result).toEqual(mockResponse);
      expect(Restaurant.findByIdAndRemove).toHaveBeenCalledTimes(1);
      expect(Restaurant.findByIdAndRemove).toBeCalledWith(restaurantId);
    });

    it('should return null', async () => {
      const restaurantId = new Types.ObjectId('123456789123456789123456');
      const mockResponse = null;

      Restaurant.findByIdAndRemove = jest.fn().mockResolvedValue(mockResponse);

      const result = await restaurantRepo.delete(restaurantId);

      expect(result).toBeNull();
      expect(Restaurant.findByIdAndRemove).toHaveBeenCalledTimes(1);
      expect(Restaurant.findByIdAndRemove).toHaveBeenCalledWith(restaurantId);
    });
  });
});
