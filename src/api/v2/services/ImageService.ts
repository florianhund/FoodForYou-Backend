import { UploadApiResponse } from 'cloudinary';

import { cloudinary } from '../lib';
import { PromiseHandler } from '../interfaces/types';
import { HttpError } from '../utils';

export default class ImageService {
  constructor(private _instance: typeof cloudinary) {}

  public async getAllImages(): PromiseHandler<any> {
    try {
      const data = await this._instance.api.resources();
      const result = {
        ...data,
        resources: data.resources.map((resource: any) => ({
          publicId: resource.public_id,
          url: resource.secure_url
        }))
      };
      return [result, undefined];
    } catch (err) {
      return [
        null,
        new HttpError(
          'Oops, something went wrong!',
          500,
          'INTERNAL_SERVER_ERROR'
        )
      ];
    }
  }

  public async getImageDetails(id: string): PromiseHandler<any> {
    try {
      const resource = await this._instance.api.resource(id);
      return [resource, undefined];
    } catch (err) {
      return [null, new HttpError('No image with that id.', 404, 'INVALID_ID')];
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
      return [
        null,
        new HttpError(
          'Oops, something went wrong!',
          500,
          'INTERNAL_SERVER_ERROR'
        )
      ];
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
      return [
        null,
        new HttpError(
          'Oops, something went wrong!',
          500,
          'INTERNAL_SERVER_ERROR'
        )
      ];
    }
  }
}
