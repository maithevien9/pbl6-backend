import { RequestHandler } from 'express';
import httpStatus from 'http-status';

import APIError from '../utils/APIError';
import { UploadService } from '../services';

class UploadController {
  static single: RequestHandler = async (req, res, next) => {
    try {
      if (!req.file) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: 'No file to upload',
        });
      }

      const url = await UploadService.single(req.file);
      return res.json({ url });
    } catch (e) {
      return next(e);
    }
  };

  static multiple: RequestHandler = async (req, res, next) => {
    try {
      if (!req.files) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: 'No files to upload',
        });
      }

      const urls = await UploadService.multiple(req.files);

      return res.json(urls);
    } catch (e) {
      return next(e);
    }
  };
}

export default UploadController;
