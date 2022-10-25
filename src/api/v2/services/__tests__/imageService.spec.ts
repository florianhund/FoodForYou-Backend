import { ImageService } from '..';
import { cloudinary } from '../../lib';

const imageSrv = new ImageService(cloudinary);

describe('get images', () => {
  it('should return arr & 200', async () => {
    const [images] = await imageSrv.getAllImages();

    expect(images).toBeTruthy();
    expect(Array.isArray(images.resources)).toBeTruthy();
  });
});

describe('get images by id', () => {
  it('should return object & 200', async () => {
    const [image] = await imageSrv.getImageDetails('cld-sample-5');

    expect(image).toBeTruthy();
  });

  it('should retrun 404 if id is not found', async () => {
    const [image, error] = await imageSrv.getImageDetails('somefakeid');

    expect(image).toBeFalsy();
    expect(error?.code).toBe(404);
  });
});
