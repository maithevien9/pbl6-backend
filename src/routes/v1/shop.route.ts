import express from 'express';
import { validate } from 'express-validation';

import { ShopController, ProductController } from '../../controllers';
import { AuthMiddleware } from '../../middlewares';
import {
  createShopSchema,
  updateShopSchema,
  getShopsSchema,
} from '../../validations/shop.validation';

import { getByShopSchema } from '../../validations/product.validation';

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

router
  .route('/:id/products')
  .get([validate(getByShopSchema)], ProductController.getByShop);

export default router;
