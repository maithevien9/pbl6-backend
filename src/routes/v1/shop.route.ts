import express from 'express';
import { validate } from 'express-validation';

import { ShopController } from '../../controllers';
import { AuthMiddleware } from '../../middlewares';
import {
  createShopSchema,
  updateShopSchema,
  getShopsSchema,
} from '../../validations/shop.validation';

const router = express.Router();

router
  .route('/')
  .get(
    [AuthMiddleware.requireAuth, validate(getShopsSchema)],
    ShopController.getAll,
  )
  .post(
    [AuthMiddleware.requireAuth, validate(createShopSchema)],
    ShopController.create,
  );

router
  .route('/:id')
  .put(
    [AuthMiddleware.requireAuth, validate(updateShopSchema)],
    ShopController.update,
  );

export default router;
