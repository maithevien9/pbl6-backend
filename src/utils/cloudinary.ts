import cloudinary from 'cloudinary';
import httpStatus from 'http-status';
import fs from 'fs';

import configs from '../configs';
import APIError from './APIError';
import log from './logger';

cloudinary.v2.config({
  cloud_name: configs.cloudinary.cloudName,
  api_key: configs.cloudinary.apiKey,
  api_secret: configs.cloudinary.apiSecret,
});

class Cloudinary {
  static upload = async (file: string): Promise<string> => {
    try {
      const res = await cloudinary.v2.uploader.upload(file, {
        folder: configs.cloudinary.folder,
        use_filename: true,
        resource_type: 'raw',
      });

      fs.unlinkSync(file);
      return res.secure_url;
    } catch (e) {
      log.error('Upload file to cloudinary failed');
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'Upload file to cloudinary failed',
      });
    }
  };
}

export default Cloudinary;
