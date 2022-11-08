import { Types } from 'mongoose';

import { OrderRepository } from '../../repositories';
import { OrderService } from '..';
import { IOrder } from '../../interfaces/models';

const orderRepo = new OrderRepository();
const orderService = new OrderService(orderRepo);

jest.mock('../../repositories');
const mockedOrderRepo = jest.mocked(orderRepo, true);

describe('OrderService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('OrderService.__getAll', () => {
    it('should return orders', async () => {
      const mockResponse = [
        {
          _id: new Types.ObjectId(),
          address: 'Rudolfstr. 7b',
          postalCode: 6067,
          user: {
            id: new Types.ObjectId()
          },
          meals: [
            {
              id: new Types.ObjectId()
            }
          ]
        },
        {
          _id: new Types.ObjectId(),
          address: 'Rudolfstr. 7b',
          postalCode: 6067,
          user: {
            id: new Types.ObjectId()
          },
          meals: [
            {
              id: new Types.ObjectId()
            }
          ]
        },
        {
          _id: new Types.ObjectId(),
          address: 'Rudolfstr. 7b',
          postalCode: 6067,
          user: {
            id: new Types.ObjectId()
          },
          meals: [
            {
              id: new Types.ObjectId()
            }
          ]
        }
      ] as unknown as IOrder[];

      mockedOrderRepo.findAll.mockResolvedValue(mockResponse);

      const [orders, error] = await orderService.getAll();

      expect(orders).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedOrderRepo.findAll).toHaveBeenCalledTimes(1);
      expect(mockedOrderRepo.findAll).toHaveBeenCalledWith('', undefined);
    });

    it('should return 500', async () => {
      const mockResponse = null;

      mockedOrderRepo.findAll.mockRejectedValue(mockResponse);

      const [orders, error] = await orderService.getAll();

      expect(orders).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedOrderRepo.findAll).toHaveBeenCalledTimes(1);
      expect(mockedOrderRepo.findAll).toHaveBeenCalledWith('', undefined);
    });
  });

  describe('OrderService.__get', () => {
    it('should return orders', async () => {
      const query = { minRating: 7 };
      const mockResponse = [
        {
          _id: new Types.ObjectId(),
          address: 'Rudolfstr. 7b',
          postalCode: 6067,
          user: {
            id: new Types.ObjectId()
          },
          meals: [
            {
              id: new Types.ObjectId()
            }
          ]
        }
      ] as unknown as IOrder[];

      mockedOrderRepo.find.mockResolvedValue(mockResponse);

      const [orders, error] = await orderService.get({
        address: 'some street'
      });

      expect(orders).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedOrderRepo.find).toHaveBeenCalledTimes(1);
    });

    it('should return 500', async () => {
      const query = { address: 'some street' };
      const mockResponse = null;

      mockedOrderRepo.find.mockRejectedValue(mockResponse);

      const [orders, error] = await orderService.get(query);

      expect(orders).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedOrderRepo.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('OrderService.__getById', () => {
    it('should return order', async () => {
      const orderId = new Types.ObjectId();
      const mockResponse = {
        _id: new Types.ObjectId(),
        address: 'Rudolfstr. 7b',
        postalCode: 6067,
        user: {
          id: new Types.ObjectId()
        },
        meals: [
          {
            id: new Types.ObjectId()
          }
        ]
      } as unknown as IOrder;

      mockedOrderRepo.findById.mockResolvedValue(mockResponse);

      const [orders, error] = await orderService.getById(orderId.toString());

      expect(orders).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedOrderRepo.findById).toHaveBeenCalledTimes(1);
      expect(mockedOrderRepo.findById).toHaveBeenCalledWith(orderId, undefined);
    });

    it('should return 500 error', async () => {
      const orderId = new Types.ObjectId();
      const mockOrder = null;

      mockedOrderRepo.findById.mockRejectedValue(mockOrder);

      const [order, error] = await orderService.getById(orderId.toString());

      expect(order).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedOrderRepo.findById).toHaveBeenCalledTimes(1);
      expect(mockedOrderRepo.findById).toHaveBeenCalledWith(orderId, undefined);
    });
  });

  describe('OrderService.__create', () => {
    it('should return created order', async () => {
      const orderData = {
        address: 'Rudolfstr. 7b',
        postalCode: 6067,
        user: {
          id: new Types.ObjectId()
        },
        meals: [
          {
            id: new Types.ObjectId()
          }
        ]
      } as unknown as IOrder;
      const mockResponse = {
        ...orderData,
        _id: new Types.ObjectId(),
        __v: 0
      } as IOrder;

      mockedOrderRepo.create.mockResolvedValue(mockResponse);

      const [order, error] = await orderService.create(orderData);

      expect(order).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedOrderRepo.create).toHaveBeenCalledTimes(1);
      expect(mockedOrderRepo.create).toHaveBeenCalledWith(orderData);
    });

    it('should return 500', async () => {
      const orderData = {
        address: 'Rudolfstr. 7b',
        postalCode: 6067,
        user: {
          id: new Types.ObjectId()
        },
        meals: [
          {
            id: new Types.ObjectId()
          }
        ]
      } as unknown as IOrder;
      const mockResponse = null;

      mockedOrderRepo.create.mockRejectedValue(mockResponse);

      const [order, error] = await orderService.create(orderData);

      expect(order).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedOrderRepo.create).toHaveBeenCalledTimes(1);
      expect(mockedOrderRepo.create).toHaveBeenCalledWith(orderData);
    });
  });

  describe('OrderService.__update', () => {
    it('should return updated order', async () => {
      const orderId = new Types.ObjectId();
      const updateQuery = {
        address: 'Fifth avenue 8'
      };
      const mockResponse = {
        _id: new Types.ObjectId(),
        address: 'Rudolfstr. 7b',
        postalCode: 6067,
        user: {
          id: new Types.ObjectId()
        },
        meals: [
          {
            id: new Types.ObjectId()
          }
        ]
      } as unknown as IOrder;

      mockedOrderRepo.update.mockImplementation(() => {
        mockResponse.address = updateQuery.address;
        return Promise.resolve(mockResponse);
      });

      const [order, error] = await orderService.update(
        orderId.toString(),
        updateQuery
      );

      expect(order).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedOrderRepo.update).toHaveBeenCalledTimes(1);
      expect(mockedOrderRepo.update).toHaveBeenCalledWith(orderId, updateQuery);
    });

    it('should return 404 error', async () => {
      const orderId = new Types.ObjectId('123456789123456789123456');
      const updateQuery = {
        address: 'Fifth avenue 8'
      };
      const mockOrder = null;

      mockedOrderRepo.update.mockResolvedValue(mockOrder);

      const [order, error] = await orderService.update(
        orderId.toString(),
        updateQuery
      );

      expect(order).toBeNull();
      expect(error?.statusCode).toBe(404);
      expect(mockedOrderRepo.update).toHaveBeenCalledTimes(1);
      expect(mockedOrderRepo.update).toHaveBeenCalledWith(orderId, updateQuery);
    });

    it('should return 500 error', async () => {
      const orderId = new Types.ObjectId('123456789123456789123456');
      const updateQuery = {
        address: 'Fifth avenue 8'
      };
      const mockOrder = null;

      mockedOrderRepo.update.mockRejectedValue(mockOrder);

      const [order, error] = await orderService.update(
        orderId.toString(),
        updateQuery
      );

      expect(order).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedOrderRepo.update).toHaveBeenCalledTimes(1);
      expect(mockedOrderRepo.update).toHaveBeenCalledWith(orderId, updateQuery);
    });
  });

  describe('OrderService.__delete', () => {
    it('should return removed order', async () => {
      const orderId = new Types.ObjectId();
      const mockResponse = {
        _id: new Types.ObjectId(),
        address: 'Rudolfstr. 7b',
        postalCode: 6067,
        user: {
          id: new Types.ObjectId()
        },
        meals: [
          {
            id: new Types.ObjectId()
          }
        ]
      } as unknown as IOrder;

      mockedOrderRepo.delete.mockResolvedValue(mockResponse);

      const [order, error] = await orderService.delete(orderId.toString());

      expect(order).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedOrderRepo.delete).toHaveBeenCalledTimes(1);
      expect(mockedOrderRepo.delete).toHaveBeenCalledWith(orderId);
    });

    it('should return 404 error', async () => {
      const orderId = new Types.ObjectId('123456789123456789123456');
      const mockOrder = null;

      mockedOrderRepo.delete.mockResolvedValue(mockOrder);

      const [order, error] = await orderService.delete(orderId.toString());

      expect(order).toBeNull();
      expect(error?.statusCode).toBe(404);
      expect(mockedOrderRepo.delete).toHaveBeenCalledTimes(1);
      expect(mockedOrderRepo.delete).toHaveBeenCalledWith(orderId);
    });

    it('should return 500 error', async () => {
      const orderId = new Types.ObjectId();
      const mockOrder = null;

      mockedOrderRepo.delete.mockRejectedValue(mockOrder);

      const [order, error] = await orderService.delete(orderId.toString());

      expect(order).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedOrderRepo.delete).toHaveBeenCalledTimes(1);
      expect(mockedOrderRepo.delete).toHaveBeenCalledWith(orderId);
    });
  });
});
