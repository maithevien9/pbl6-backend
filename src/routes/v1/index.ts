import express from 'express';

import roleRoute from './role.route';
import authRoute from './auth.route';
import docRouter from './docs.route';
import category from './category.route';
import uploadRoute from './upload.route';
import shopRoute from './shop.route';
import productRoute from './product.route';
import orderRoute from './order.route';
import userRoute from './user.route';

const router = express.Router();

router.use('/roles', roleRoute);
router.use('/auth', authRoute);
router.use('/docs', docRouter);
router.use('/categories', category);
router.use('/uploads', uploadRoute);
router.use('/shops', shopRoute);
router.use('/products', productRoute);
router.use('/orders', orderRoute);
router.use('/user', userRoute);

export default router;
