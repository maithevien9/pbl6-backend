import express from 'express';

import { UploadController } from '../../controllers';
import { MulterMiddleware } from '../../middlewares';

const router = express.Router();

router
  .route('/single')
  .post([MulterMiddleware.upload.single('photo')], UploadController.single);
router
  .route('/multiple')
  .post([MulterMiddleware.upload.array('photo')], UploadController.multiple);

export default router;
