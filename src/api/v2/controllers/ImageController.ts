import { Request, Response } from 'express';

import { IRoute } from '../interfaces';
import { httpMethods } from '../interfaces/types';
import HttpController from './base/HttpController';
import ImageService from '../services/ImageService';
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
      path: '/:id(*)',
      method: httpMethods.GET,
      handler: this.getImageDetails
    }
  ];

  constructor(private _imageSrv: ImageService) {
    super();
    super.bindHandlers(this);
  }

  private async getImages(req: Request, res: Response) {
    const [result, err] = await this._imageSrv.getAllImages();
    if (!result) return super.sendError(res, err);
    super.sendSuccess(res, result);
  }

  // TODO: check req.file (req.body.img) in validator
  private async uploadImage(req: Request, res: Response) {
    if (!req.file?.path) return res.send('error');
    const [result, err] = await this._imageSrv.upload(req.file.path, 'unused');
    if (!result) return super.sendError(res, err);
    res.setHeader('Location', `images/${result?.public_id}`);
    super.sendSuccess(res, {}, 201);
  }

  private async getImageDetails(req: Request, res: Response) {
    const { id } = req.params;
    const [result, err] = await this._imageSrv.getImageDetails(id);
    if (!result) return super.sendError(res, err);
    super.sendSuccess(res, result);
  }
}
