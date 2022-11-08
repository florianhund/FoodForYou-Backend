import { UploadApiResponse } from 'cloudinary';
import { cloudinary } from '../../lib';
import ImageService from '../ImageService';

jest.mock('../../lib');
const mockedCloudinary = jest.mocked(cloudinary, true);

const imageService = new ImageService(cloudinary);

describe('ImageService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('ImageService.__getAllImages', () => {
    it('should return data', async () => {
      const mockResponse = { resources: [] };
      mockedCloudinary.api.resources.mockResolvedValue(mockResponse);

      const [images, error] = await imageService.getAllImages();

      expect(images).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedCloudinary.api.resources).toHaveBeenCalledTimes(1);
    });

    it('should return 500 error', async () => {
      const mockResponse = null;
      mockedCloudinary.api.resources.mockRejectedValue(mockResponse);

      const [images, error] = await imageService.getAllImages();

      expect(images).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedCloudinary.api.resources).toHaveBeenCalledTimes(1);
    });
  });

  describe('ImageService.__getImageDetails', () => {
    it('should return data', async () => {
      const publicId = 'cld-sample-5';
      const mockResponse = {
        publid_id: publicId,
        url: 'http://example.com',
        secureUrl: 'https://example.com',
        version: 3,
        width: 500,
        height: 200
      };

      mockedCloudinary.api.resource.mockResolvedValue(mockResponse);

      const [image, error] = await imageService.getImageDetails(publicId);

      expect(image).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedCloudinary.api.resource).toHaveBeenCalledTimes(1);
      expect(mockedCloudinary.api.resource).toHaveBeenCalledWith(publicId);
    });

    it('should return 404 error', async () => {
      const publicId = 'cld-sample-5';
      const mockResponse = null;

      mockedCloudinary.api.resource.mockRejectedValue(mockResponse);

      const [image, error] = await imageService.getImageDetails(publicId);

      expect(image).toBeNull();
      expect(error?.statusCode).toBe(404);
      expect(mockedCloudinary.api.resource).toHaveBeenCalledTimes(1);
      expect(mockedCloudinary.api.resource).toHaveBeenCalledWith(publicId);
    });
  });

  describe('ImageService.__upload', () => {
    it('should return uploaded image', async () => {
      const mockResponse = {
        publid_id: 'cld-sample-5',
        url: 'http://example.com',
        secureUrl: 'https://example.com',
        version: 3,
        width: 500,
        height: 200
      } as unknown as UploadApiResponse;

      mockedCloudinary.uploader.upload.mockResolvedValue(mockResponse);

      const [image, error] = await imageService.upload('somefile');

      expect(image).toEqual(mockResponse);
      expect(error).toBeUndefined();
      expect(mockedCloudinary.uploader.upload).toHaveBeenCalledTimes(1);
    });

    it('should return 500 error', async () => {
      const mockResponse = null;

      mockedCloudinary.uploader.upload.mockRejectedValue(mockResponse);

      const [image, error] = await imageService.upload('somefile');

      expect(image).toBeNull();
      expect(error?.statusCode).toBe(500);
      expect(mockedCloudinary.uploader.upload).toHaveBeenCalledTimes(1);
    });
  });

  describe('ImageService.__changeFolder', () => {
    it('should return updated image', async () => {
      const publicId = 'cld-sample-5';
      const folderName = 'testfolder/test';
      const mockResponse = {
        public_id: `${folderName}/${publicId}`,
        url: 'http://example.com',
        secureUrl: 'https://example.com',
        version: 3,
        width: 500,
        height: 200
      };

      mockedCloudinary.uploader.rename.mockResolvedValue(mockResponse);

      const [newPublicId, error] = await imageService.changeFolder(
        publicId,
        folderName
      );

      expect(newPublicId).toEqual(`${folderName}/${publicId}`);
      expect(error).toBeUndefined();
      expect(mockedCloudinary.uploader.rename).toHaveBeenCalledTimes(1);
      expect(mockedCloudinary.uploader.rename).toHaveBeenCalledWith(
        publicId,
        `${folderName}/${publicId}`
      );
    });

    it('should return 404 error', async () => {
      const publicId = 'fakeid';
      const folderName = 'testfolder/test';
      const mockResponse = null;

      mockedCloudinary.uploader.rename.mockRejectedValue(mockResponse);

      const [newPublicId, error] = await imageService.changeFolder(
        publicId,
        folderName
      );

      expect(newPublicId).toBeNull();
      expect(error?.statusCode).toBe(404);
      expect(mockedCloudinary.uploader.rename).toHaveBeenCalledTimes(1);
      expect(mockedCloudinary.uploader.rename).toHaveBeenCalledWith(
        publicId,
        `${folderName}/${publicId}`
      );
    });
  });
});
