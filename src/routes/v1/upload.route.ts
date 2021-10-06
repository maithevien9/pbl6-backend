import express from 'express';

import { UploadController } from '../../controllers';
import { AuthMiddleware, MulterMiddleware } from '../../middlewares';

const router = express.Router();

router
  .route('/single')
  .post(
    [AuthMiddleware.requireAuth, MulterMiddleware.upload.single('photo')],
    UploadController.single,
  );
router
  .route('/multiple')
  .post(
    [AuthMiddleware.requireAuth, MulterMiddleware.upload.array('photo')],
    UploadController.multiple,
  );

export default router;
