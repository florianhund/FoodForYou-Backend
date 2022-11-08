import {
  getMockedRequest,
  getMockedResponse
} from '../../../../../__tests__/utils';
import { IHttpError } from '../../interfaces';
import { cloudinary } from '../../lib';
import { ImageService } from '../../services';
import { HttpError } from '../../utils';
import ImageController from '../ImageController';

const imageService = new ImageService(cloudinary);
const imageController = new ImageController(imageService);

jest.mock('../../services');
const mockedImageService = jest.mocked(imageService, true);

describe('ImageController', () => {
  describe('ImageController.__getImages', () => {
    it('should send 200 response', async () => {
      const mockResponse: [any, undefined] = [{ resources: [] }, undefined];

      const mReq = getMockedRequest();
      const mRes = getMockedResponse();
      mockedImageService.getAllImages.mockResolvedValue(mockResponse);

      await imageController.routes[0].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.status).toBeCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({ data: mockResponse[0] });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });

    it('should send 500 error', async () => {
      const mockError = new HttpError(
        'Meal was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest();
      const mRes = getMockedResponse();
      mockedImageService.getAllImages.mockResolvedValue(mockResponse);

      await imageController.routes[0].handler(mReq, mRes);

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

  describe('ImageController.__getImageDetails', () => {
    it('should send 200 response', async () => {
      const imageDetails = {
        publid_id: 'cld-sample-5',
        url: 'http://example.com',
        secureUrl: 'https://example.com',
        version: 3,
        width: 500,
        height: 200
      };
      const mockResponse: [any, undefined] = [imageDetails, undefined];

      const mReq = getMockedRequest();
      const mRes = getMockedResponse();
      mockedImageService.getImageDetails.mockResolvedValue(mockResponse);

      await imageController.routes[2].handler(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.status).toHaveBeenCalledTimes(1);
      expect(mRes.json).toHaveBeenCalledWith({ data: imageDetails });
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });

    it('should send 500 error', async () => {
      const mockError = new HttpError(
        'Meal was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest();
      const mRes = getMockedResponse();
      mockedImageService.getImageDetails.mockResolvedValue(mockResponse);

      await imageController.routes[2].handler(mReq, mRes);

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

  describe('ImageController.__uploadImage', () => {
    it('should send 201 response', async () => {
      const imageDetails = {
        public_id: 'cld-sample-5',
        url: 'http://example.com',
        secureUrl: 'https://example.com',
        version: 3,
        width: 500,
        height: 200
      };
      const mockResponse: [any, undefined] = [imageDetails, undefined];

      const mReq = getMockedRequest({}, { img: 'somebuffer' });
      const mRes = getMockedResponse();
      mockedImageService.upload.mockResolvedValue(mockResponse);
      await imageController.routes[1].handler(mReq, mRes);

      expect(mRes.sendStatus).toHaveBeenCalledWith(201);
      expect(mRes.sendStatus).toHaveBeenCalledTimes(1);
      expect(mRes.setHeader).toHaveBeenCalledWith(
        'Location',
        `images/cld-sample-5`
      );
    });

    it('should send 500 error', async () => {
      const mockError = new HttpError(
        'Meal was not found.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
      const mockResponse: [null, IHttpError] = [null, mockError];

      const mReq = getMockedRequest();
      const mRes = getMockedResponse();
      mockedImageService.upload.mockResolvedValue(mockResponse);

      await imageController.routes[1].handler(mReq, mRes);

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
