import express from 'express';
import { validate } from 'express-validation';

import { ProductController } from '../../controllers';
import { AuthMiddleware } from '../../middlewares';
import {
  createProductSchema,
  getProductsSchema,
  updateProductSchema,
  getProductSchema,
} from '../../validations/product.validation';

const router = express.Router();

router
  .route('/')
  .get([validate(getProductsSchema)], ProductController.getAll)
  .post(
    [AuthMiddleware.requireAuth, validate(createProductSchema)],
    ProductController.create,
  );

router
  .route('/:id')
  .get(
    [AuthMiddleware.requireAuth, validate(getProductSchema)],
    ProductController.getOne,
  )
  .put(
    [AuthMiddleware.requireAuth, validate(updateProductSchema)],
    ProductController.update,
  );

export default router;
