import { UploadApiResponse } from 'cloudinary';

import cloudinary from '../../../config/cloudinary';
import { PromiseHandler } from '../interfaces/types';
import { HttpError } from '../utils';

export default class ImageService {
  constructor(private _instance: typeof cloudinary) {}

  public async getAllImages(): PromiseHandler<any> {
    try {
      const resources = await this._instance.api.resources();
      return [resources, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }

  public async getImageDetails(id: string): PromiseHandler<any> {
    try {
      const resource = await this._instance.api.resource(id);
      if (!resource)
        return [
          null,
          new HttpError('No image with that id.', 404, 'INVALID_ID')
        ];
      return [resource, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }

  public async upload(
    file: string,
    folder?: string
  ): PromiseHandler<UploadApiResponse> {
    try {
      const resource = await this._instance.uploader.upload(file, {
        resource_type: 'auto',
        folder
      });
      return [resource, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
    // return new Promise(resolve => {
    //   this._instance.uploader.upload(
    //     file,
    //     {
    //       ressource_type: 'auto',
    //       folder
    //     },
    //     (_err, result) => {
    //       resolve({
    //         result: {
    //           public_id: result?.public_id,
    //           format: result?.format,
    //           created_at: result?.created_at,
    //           bytes: result?.bytes,
    //           url: result?.secure_url
    //         }
    //       });
    //     }
    //   );
    // });
  }

  public async changeFolder(
    publicId: string,
    folderName: string
  ): PromiseHandler<string> {
    try {
      const { public_id: newId } = await this._instance.uploader.rename(
        publicId,
        `${folderName}/${publicId.slice(publicId.lastIndexOf('/') + 1)}`
      );
      if (!newId)
        return [
          null,
          new HttpError(
            'No image with specified id was found.',
            404,
            'INVALID_ID'
          )
        ];
      return [newId, undefined];
    } catch (err) {
      return [null, new HttpError()];
    }
  }
}
