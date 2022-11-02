import { Types } from 'mongoose';

import { RestaurantRepository } from '../../repositories';
import { RestaurantService } from '..';
import { IRestaurant } from '../../interfaces/models';

const restaurantRepo = new RestaurantRepository();
const restaurantService = new RestaurantService(restaurantRepo);

jest.mock('../../repositories');
const mockedRestaurantRepo = jest.mocked(restaurantRepo, true);

describe('RestaurantService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('RestaurantService.__getAll', () => {
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
      ] as IRestaurant[];

      mockedRestaurantRepo.findAll.mockResolvedValue(mockResponse);

      const [restaurants, error] = await restaurantService.getAll();

      expect(restaurants).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedRestaurantRepo.findAll).toHaveBeenCalledTimes(1);
      expect(mockedRestaurantRepo.findAll).toHaveBeenCalledWith('', undefined);
    });

    it('should return 500', async () => {
      const mockResponse = null;

      mockedRestaurantRepo.findAll.mockRejectedValue(mockResponse);

      const [restaurants, error] = await restaurantService.getAll();

      expect(restaurants).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedRestaurantRepo.findAll).toHaveBeenCalledTimes(1);
      expect(mockedRestaurantRepo.findAll).toHaveBeenCalledWith('', undefined);
    });
  });

  describe('RestaurantService.__get', () => {
    it('should return restaurants', async () => {
      const query = { minRating: 7 };
      const mockResponse = [
        {
          _id: new Types.ObjectId(),
          name: 'restaurant',
          rating: 7,
          postalCode: 6060,
          address: 'hallstraße',
          __v: 0
        }
      ] as IRestaurant[];

      mockedRestaurantRepo.find.mockResolvedValue(mockResponse);

      const [restaurants, error] = await restaurantService.get(query);

      expect(restaurants).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedRestaurantRepo.find).toHaveBeenCalledTimes(1);
    });

    it('should return 500', async () => {
      const query = { minRating: 7 };
      const mockResponse = null;

      mockedRestaurantRepo.find.mockRejectedValue(mockResponse);

      const [restaurants, error] = await restaurantService.get(query);

      expect(restaurants).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedRestaurantRepo.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('RestaurantService.__getById', () => {
    it('should return restaurant', async () => {
      const restaurantId = new Types.ObjectId();
      const mockResponse = {
        _id: restaurantId,
        name: 'il mondo',
        rating: 7,
        postalCode: 6060,
        address: 'hallstraße',
        __v: 0
      } as IRestaurant;

      mockedRestaurantRepo.findById.mockResolvedValue(mockResponse);

      const [restaurants, error] = await restaurantService.getById(
        restaurantId.toString()
      );

      expect(restaurants).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedRestaurantRepo.findById).toHaveBeenCalledTimes(1);
      expect(mockedRestaurantRepo.findById).toHaveBeenCalledWith(
        restaurantId,
        undefined
      );
    });

    it('should return 500 error', async () => {
      const restaurantId = new Types.ObjectId();
      const mockRestaurant = null;

      mockedRestaurantRepo.findById.mockRejectedValue(mockRestaurant);

      const [restaurant, error] = await restaurantService.getById(
        restaurantId.toString()
      );

      expect(restaurant).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedRestaurantRepo.findById).toHaveBeenCalledTimes(1);
      expect(mockedRestaurantRepo.findById).toHaveBeenCalledWith(
        restaurantId,
        undefined
      );
    });
  });

  describe('RestaurantService.__create', () => {
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
      } as IRestaurant;

      mockedRestaurantRepo.create.mockResolvedValue(mockResponse);

      const [restaurant, error] = await restaurantService.create(
        restaurantData
      );

      expect(restaurant).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedRestaurantRepo.create).toHaveBeenCalledTimes(1);
      expect(mockedRestaurantRepo.create).toHaveBeenCalledWith(restaurantData);
    });

    it('should return 500', async () => {
      const restaurantData = {
        name: 'il mondo',
        rating: 7,
        postalCode: 6060,
        address: 'hallstraße'
      } as IRestaurant;
      const mockResponse = null;

      mockedRestaurantRepo.create.mockRejectedValue(mockResponse);

      const [restaurant, error] = await restaurantService.create(
        restaurantData
      );

      expect(restaurant).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedRestaurantRepo.create).toHaveBeenCalledTimes(1);
      expect(mockedRestaurantRepo.create).toHaveBeenCalledWith(restaurantData);
    });
  });

  describe('RestaurantService.__update', () => {
    it('should return updated restaurant', async () => {
      const restaurantId = new Types.ObjectId();
      const updateQuery = {
        rating: 8
      };
      const mockResponse = {
        _id: restaurantId,
        name: 'il mondo',
        rating: 7,
        postalCode: 6060,
        address: 'hallstraße',
        __v: 0
      } as IRestaurant;

      mockedRestaurantRepo.update.mockImplementation(() => {
        mockResponse.rating = updateQuery.rating;
        return Promise.resolve(mockResponse);
      });

      const [restaurant, error] = await restaurantService.update(
        restaurantId.toString(),
        updateQuery
      );

      expect(restaurant).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedRestaurantRepo.update).toHaveBeenCalledTimes(1);
      expect(mockedRestaurantRepo.update).toHaveBeenCalledWith(
        restaurantId,
        updateQuery
      );
    });

    it('should return 404 error', async () => {
      const restaurantId = new Types.ObjectId('123456789123456789123456');
      const updateQuery = {
        rating: 8
      };
      const mockRestaurant = null;

      mockedRestaurantRepo.update.mockResolvedValue(mockRestaurant);

      const [restaurant, error] = await restaurantService.update(
        restaurantId.toString(),
        updateQuery
      );

      expect(restaurant).toBeNull();
      expect(error?.statusCode).toBe(404);
      expect(mockedRestaurantRepo.update).toHaveBeenCalledTimes(1);
      expect(mockedRestaurantRepo.update).toHaveBeenCalledWith(
        restaurantId,
        updateQuery
      );
    });

    it('should return 500 error', async () => {
      const restaurantId = new Types.ObjectId('123456789123456789123456');
      const updateQuery = {
        rating: 8
      };
      const mockRestaurant = null;

      mockedRestaurantRepo.update.mockRejectedValue(mockRestaurant);

      const [restaurant, error] = await restaurantService.update(
        restaurantId.toString(),
        updateQuery
      );

      expect(restaurant).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedRestaurantRepo.update).toHaveBeenCalledTimes(1);
      expect(mockedRestaurantRepo.update).toHaveBeenCalledWith(
        restaurantId,
        updateQuery
      );
    });
  });

  describe('RestaurantService.__delete', () => {
    it('should return removed restaurant', async () => {
      const restaurantId = new Types.ObjectId();
      const mockResponse = {
        _id: restaurantId,
        name: 'il mondo',
        rating: 7,
        postalCode: 6060,
        address: 'hallstraße',
        __v: 0
      } as IRestaurant;

      mockedRestaurantRepo.delete.mockResolvedValue(mockResponse);

      const [restaurant, error] = await restaurantService.delete(
        restaurantId.toString()
      );

      expect(restaurant).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedRestaurantRepo.delete).toHaveBeenCalledTimes(1);
      expect(mockedRestaurantRepo.delete).toHaveBeenCalledWith(restaurantId);
    });

    it('should return 404 error', async () => {
      const restaurantId = new Types.ObjectId('123456789123456789123456');
      const mockRestaurant = null;

      mockedRestaurantRepo.delete.mockResolvedValue(mockRestaurant);

      const [restaurant, error] = await restaurantService.delete(
        restaurantId.toString()
      );

      expect(restaurant).toBeNull();
      expect(error?.statusCode).toBe(404);
      expect(mockedRestaurantRepo.delete).toHaveBeenCalledTimes(1);
      expect(mockedRestaurantRepo.delete).toHaveBeenCalledWith(restaurantId);
    });

    it('should return 500 error', async () => {
      const restaurantId = new Types.ObjectId();
      const mockRestaurant = null;

      mockedRestaurantRepo.delete.mockRejectedValue(mockRestaurant);

      const [restaurant, error] = await restaurantService.delete(
        restaurantId.toString()
      );

      expect(restaurant).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedRestaurantRepo.delete).toHaveBeenCalledTimes(1);
      expect(mockedRestaurantRepo.delete).toHaveBeenCalledWith(restaurantId);
    });
  });
});
