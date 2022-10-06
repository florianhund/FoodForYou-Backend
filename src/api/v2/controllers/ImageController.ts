import { Request, Response } from 'express';

import cloudinary, { upload } from '../../../config/cloudinary';
import { IRoute } from '../interfaces';
import { httpMethods } from '../interfaces/types';
import HttpController from './base/HttpController';
import { uploadImage } from '../middlewares';

export default class ImageController extends HttpController {
  path = '/images';

  routes: IRoute[] = [
    {
      path: '/',
      method: httpMethods.GET,
      handler: this.getImages
    },
    {
      path: '/',
      method: httpMethods.POST,
      handler: this.uploadImage,
      localMiddleware: [uploadImage.single('img')]
    },
    {
      path: '/:id',
      method: httpMethods.GET,
      handler: this.getImageDetails
    }
  ];

  private async getImages(req: Request, res: Response) {
    const result = await cloudinary.api.resources();
    const data = {
      ...result,
      resources: result.resources.map((resource: any) => ({
        publicId: resource.public_id,
        url: resource.secure_url
      }))
    };
    res.send(data);
  }

  private async uploadImage(req: Request, res: Response) {
    if (!req.file?.path) return res.send('error');
    let result;
    try {
      // result = await cloudinary.uploader.upload(req.file?.path);
      result = await upload(req.file.path, 'unused');
    } catch (error) {
      return super.sendError(res);
    }
    res.setHeader('Location', `images/${result?.public_id}`);
    super.sendSuccess(res, {}, 201);
  }

  private async getImageDetails(req: Request, res: Response) {
    const { id } = req.params;
    const result = await cloudinary.api.resource(id);
    res.send(result);
  }
}
