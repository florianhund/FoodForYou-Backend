import { v2 as cloudinary } from 'cloudinary';

import {
  CLOUDINARY_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET
} from './constants';

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
  secure: true
});

export const upload = (file: string, folder?: string): Promise<any> => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(
      file,
      {
        ressource_type: 'auto',
        folder
      },
      (_error, result) => {
        resolve({
          result: {
            public_id: result?.public_id,
            format: result?.format,
            created_at: result?.created_at,
            bytes: result?.bytes,
            url: result?.secure_url
          }
        });
      }
    );
  });
};

export default cloudinary;
