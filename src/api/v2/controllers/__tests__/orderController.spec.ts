import { Types } from 'mongoose';

import { OrderRepository } from '../../repositories';
import { OrderService } from '../../services';
import OrderController from '../OrderController';
import { HttpError } from '../../utils';
import {
  getMockedRequest,
  getMockedResponse
} from '../../../../../__tests__/utils';
import { IOrder } from '../../interfaces/models';
import { IHttpError } from '../../interfaces';

const orderService = new OrderService(new OrderRepository());
const orderController = new OrderController(orderService);

jest.mock('../../services');
const mockedOrderService = jest.mocked(orderService, true);

describe('OrderController', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('OrderController.__getOrders', () => {
    it('should send 200 response with empty query', async () => {
      const mockOrders = [
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
      const mockResponse: [IOrder[], undefined] = [mockOrders, undefined];

      const mReq = getMockedRequest();
      const mRes = getMockedResponse();
      // orderService.getById = jest.fn().mockResolvedValue(mockResponse);
      mockedOrderService.getAll.mockResolvedValue(mockResponse);

      await orderController.routes[0].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({ data: mockOrders });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });

    it('should send 200 response with query', async () => {
      const mockOrders = [
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
      const mockResponse: [IOrder[], undefined] = [mockOrders, undefined];

      const mReq = getMockedRequest(
        {},
        {},
        { min_price: 10, sort_by: '-address' }
      );
      const mRes = getMockedResponse();
      // orderService.getById = jest.fn().mockResolvedValue(mockResponse);
      mockedOrderService.get.mockResolvedValue(mockResponse);

      await orderController.routes[0].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({ data: mockOrders });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });

    it('should return 500 error with empty query', async () => {
      const mockError = new HttpError(
        'Order was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest();
      const mRes = getMockedResponse();
      mockedOrderService.getAll.mockResolvedValue(mockResponse);

      await orderController.routes[0].handler(mReq, mRes);

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
        'Order was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({}, {}, { min_price: 7 });
      const mRes = getMockedResponse();
      mockedOrderService.get.mockResolvedValue(mockResponse);

      await orderController.routes[0].handler(mReq, mRes);

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

  describe('OrderController.__getOrderById', () => {
    it('should send 200 response', async () => {
      const orderId = new Types.ObjectId();
      const mockOrder = {
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
      const mockResponse: [IOrder, undefined] = [mockOrder, undefined];

      const mReq = getMockedRequest({ id: orderId.toString() });
      const mRes = getMockedResponse();
      // orderService.getById = jest.fn().mockResolvedValue(mockResponse);
      mockedOrderService.getById.mockResolvedValue(mockResponse);

      await orderController.routes[2].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({ data: mockOrder });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });

    it('should return 500 error', async () => {
      const mockError = new HttpError(
        'Order was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest();
      const mRes = getMockedResponse();
      mockedOrderService.getById.mockResolvedValue(mockResponse);

      await orderController.routes[2].handler(mReq, mRes);

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

  describe('OrderController.__createOrder', () => {
    it('should send 201 response', async () => {
      const order = {
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
      const mockResponse: [IOrder, undefined] = [order, undefined];

      const mReq = getMockedRequest({}, { ...order });
      const mRes = getMockedResponse();
      mockedOrderService.create.mockResolvedValue(mockResponse);

      await orderController.routes[1].handler(mReq, mRes);

      expect(mRes.sendStatus).toHaveBeenCalledWith(201);
      expect(mRes.sendStatus).toHaveBeenCalledTimes(1);
    });

    it('should send 500 error', async () => {
      const order = {
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
      const mockError = new HttpError(
        'Order was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({}, { ...order });
      const mRes = getMockedResponse();
      // orderService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedOrderService.create.mockResolvedValue(mockResponse);

      await orderController.routes[1].handler(mReq, mRes);

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

  describe('OrderController.__updateOrder', () => {
    it('should send 204 response', async () => {
      const orderId = new Types.ObjectId();
      const updateQuery = { address: 'London Avenue 8' };
      const mockOrder = {
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
      const mockResponse: [IOrder, undefined] = [mockOrder, undefined];

      const mReq = getMockedRequest(
        { id: orderId.toString() },
        { updateQuery }
      );
      const mRes = getMockedResponse();
      mockedOrderService.update.mockImplementation(() => {
        mockOrder.address = updateQuery.address;
        return Promise.resolve(mockResponse);
      });

      await orderController.routes[3].handler(mReq, mRes);

      expect(mRes.sendStatus).toHaveBeenCalledWith(204);
      expect(mRes.sendStatus).toHaveBeenCalledTimes(1);
    });

    it('should send 404 error', async () => {
      const orderId = new Types.ObjectId('123456789123456789123456');
      const mockError = new HttpError(
        'No order with specified id was found.',
        404,
        'NOT_FOUND'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({ id: orderId });
      const mRes = getMockedResponse();
      // orderService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedOrderService.update.mockResolvedValue(mockResponse);

      await orderController.routes[3].handler(mReq, mRes);

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
      const orderId = new Types.ObjectId();
      const mockError = new HttpError(
        'Order was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({ id: orderId });
      const mRes = getMockedResponse();
      // orderService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedOrderService.update.mockResolvedValue(mockResponse);

      await orderController.routes[3].handler(mReq, mRes);

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

  describe('OrderController.__deleteOrder', () => {
    it('should return 204', async () => {
      const orderId = new Types.ObjectId();
      const mockOrder = {
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
      const mockResponse: [IOrder, undefined] = [mockOrder, undefined];

      const mReq = getMockedRequest({ id: orderId });
      const mRes = getMockedResponse();
      // orderService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedOrderService.delete.mockResolvedValue(mockResponse);

      await orderController.routes[4].handler(mReq, mRes);

      expect(mRes.sendStatus).toHaveBeenCalledWith(204);
      expect(mRes.sendStatus).toHaveBeenCalledTimes(1);
    });

    it('should return 404', async () => {
      const orderId = new Types.ObjectId('123456789123456789123456');
      const mockError = new HttpError(
        'No order with specified id was found.',
        404,
        'NOT_FOUND'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({ id: orderId });
      const mRes = getMockedResponse();
      // orderService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedOrderService.delete.mockResolvedValue(mockResponse);

      await orderController.routes[4].handler(mReq, mRes);

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
      const orderId = new Types.ObjectId();
      const mockError = new HttpError(
        'Order was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest({ id: orderId });
      const mRes = getMockedResponse();
      // restaurantService.delete = jest.fn().mockResolvedValue(mockResponse);
      mockedOrderService.delete.mockResolvedValue(mockResponse);

      await orderController.routes[4].handler(mReq, mRes);

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
