import { Types } from 'mongoose';

import { OrderRepository as OrderRepo } from '..';
import { Order } from '../../models';
import { IOrder } from '../../interfaces/models';

const orderRepo = new OrderRepo();

describe('OrderRepo', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('OrderRepo.__findAll', () => {
    it('should return orders', async () => {
      const mockResponse = [
        {
          _id: new Types.ObjectId(),
          address: 'Avenue street 7b',
          postalCode: 6020,
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
          address: 'Morgan street',
          postalCode: 6060,
          user: {
            id: new Types.ObjectId()
          },
          meals: [
            {
              id: new Types.ObjectId()
            }
          ]
        }
      ];

      Order.find = jest.fn().mockImplementation(() => ({
        sort: jest.fn().mockImplementation(() => ({
          select: jest.fn().mockResolvedValue(mockResponse)
        }))
      }));

      const result = await orderRepo.findAll();

      expect(result).toEqual(mockResponse);
      expect(Order.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('OrderRepo.__find', () => {
    it('should return orders', async () => {
      const query = { rating: { $gte: 7 } };
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
      ];

      Order.find = jest.fn().mockImplementation(() => ({
        sort: jest.fn().mockImplementation(() => ({
          select: jest.fn().mockResolvedValue(mockResponse)
        }))
      }));

      const result = await orderRepo.find(query);

      expect(result).toEqual(mockResponse);
      expect(Order.find).toHaveBeenCalledTimes(1);
      expect(Order.find).toHaveBeenCalledWith(query);
    });
  });

  describe('OrderRepo.__findById', () => {
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
      };

      Order.findById = jest.fn().mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(mockResponse)
      }));

      const result = await orderRepo.findById(orderId);

      expect(result).toEqual(mockResponse);
      expect(Order.findById).toHaveBeenCalledTimes(1);
      expect(Order.findById).toHaveBeenCalledWith(orderId);
    });

    it('should return null', async () => {
      const orderId = new Types.ObjectId('123456789123456789123456');
      const mockResponse = null;

      Order.findById = jest.fn().mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(mockResponse)
      }));

      const result = await orderRepo.findById(orderId);

      expect(result).toBeNull();
      expect(Order.findById).toHaveBeenCalledTimes(1);
      expect(Order.findById).toHaveBeenCalledWith(orderId);
    });
  });

  describe('OrderRepo.__create', () => {
    it('should return created order', async () => {
      const orderData = {
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
      const mockResponse = {
        ...orderData,
        _id: new Types.ObjectId(),
        __v: 0
      };

      Order.create = jest.fn().mockResolvedValue(mockResponse);

      const result = await orderRepo.create(orderData);

      expect(result).toEqual(mockResponse);
      expect(Order.create).toHaveBeenCalledTimes(1);
      expect(Order.create).toBeCalledWith(orderData);
    });
  });

  describe('OrderRepo.__update', () => {
    it('should return updated order', async () => {
      const orderId = new Types.ObjectId();
      const updateQuery = {
        postalCode: 6060
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
        ],
        __v: 0
      };

      Order.findByIdAndUpdate = jest.fn().mockImplementation(() => {
        mockResponse.postalCode = updateQuery.postalCode;
        return mockResponse;
      });

      const result = await orderRepo.update(orderId, updateQuery);

      expect(result).toEqual(mockResponse);
      expect(Order.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(Order.findByIdAndUpdate).toHaveBeenCalledWith(
        orderId,
        updateQuery,
        {
          new: true
        }
      );
    });

    it('should return null', async () => {
      const orderId = new Types.ObjectId('123456789123456789123456');
      const updateQuery = {
        price: 11
      };
      const mockResponse = null;

      Order.findByIdAndUpdate = jest.fn().mockResolvedValue(mockResponse);

      const result = await orderRepo.update(orderId, updateQuery);

      expect(result).toBeNull();
      expect(Order.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(Order.findByIdAndUpdate).toHaveBeenCalledWith(
        orderId,
        updateQuery,
        {
          new: true
        }
      );
    });
  });

  describe('OrderRepo.__delete', () => {
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
        ],
        __v: 0
      };

      Order.findByIdAndRemove = jest.fn().mockResolvedValue(mockResponse);

      const result = await orderRepo.delete(orderId);

      expect(result).toEqual(mockResponse);
      expect(Order.findByIdAndRemove).toHaveBeenCalledTimes(1);
      expect(Order.findByIdAndRemove).toBeCalledWith(orderId);
    });

    it('should return null', async () => {
      const orderId = new Types.ObjectId('123456789123456789123456');
      const mockResponse = null;

      Order.findByIdAndRemove = jest.fn().mockResolvedValue(mockResponse);

      const result = await orderRepo.delete(orderId);

      expect(result).toBeNull();
      expect(Order.findByIdAndRemove).toHaveBeenCalledTimes(1);
      expect(Order.findByIdAndRemove).toHaveBeenCalledWith(orderId);
    });
  });
});
