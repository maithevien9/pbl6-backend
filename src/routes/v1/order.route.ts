/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { validate } from 'express-validation';

import { OrderController } from '../../controllers';
import { AuthMiddleware } from '../../middlewares';
import {
  createOrderSchema,
  updateOrderSchema,
  getOrdersSchema,
  payment,
  paymentNotification,
} from '../../validations/order.validations';

const router = express.Router();

router
  .route('/')
  .get(
    [AuthMiddleware.requireAuth, validate(getOrdersSchema)],
    OrderController.getAll,
  )
  .post(
    [AuthMiddleware.requireAuth, validate(createOrderSchema)],
    OrderController.create,
  );

router
  .route('/:id')
  .put(
    [AuthMiddleware.requireAuth, validate(updateOrderSchema)],
    OrderController.update,
  );

router
  .route('/my-orders')
  .get([AuthMiddleware.requireAuth], OrderController.getByUser);

router
  .route('/:id/payment')
  .get(
    [AuthMiddleware.requireAuth, validate(payment)],
    OrderController.payment,
  );

router
  .route('/payment-notification')
  .get([validate(paymentNotification)], OrderController.paymentNotification);

export default router;
