import { Request, Response } from 'express';

import cloudinary, { upload } from '../../../config/cloudinary';
import { IRoute } from '../interfaces';
import { httpMethods } from '../interfaces/types';
import HttpController from './base/HttpController';
import { uploadImage } from '../middlewares';
import HttpError from '../utils/HttpError';

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

  constructor() {
    super();
    super.bindHandlers(this);
  }

  private async getImages(req: Request, res: Response) {
    const result = await cloudinary.api.resources();
    const data = {
      ...result,
      resources: result.resources.map((resource: any) => ({
        publicId: resource.public_id,
        url: resource.secure_url
      }))
    };

    super.sendSuccess(res, data);
  }

  // TODO: check req.file in validator
  private async uploadImage(req: Request, res: Response) {
    if (!req.file?.path) return res.send('error');
    let result;
    try {
      result = await upload(req.file.path, 'unused');
    } catch (error) {
      return super.sendError(res);
    }
    res.setHeader('Location', `images/${result?.public_id}`);
    super.sendSuccess(res, {}, 201);
  }

  private async getImageDetails(req: Request, res: Response) {
    const { id } = req.params;
    let result;
    try {
      result = await cloudinary.api.resource(id);
    } catch (err) {
      return super.sendError(
        res,
        new HttpError('Not found', 404, 'INVALID ID')
      );
    }
    super.sendSuccess(res, result);
  }
}
