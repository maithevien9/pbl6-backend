import express from 'express';

import roleRoute from './role.route';
import authRoute from './auth.route';
import docRouter from './docs.route';

const router = express.Router();

router.use('/roles', roleRoute);
router.use('/auth', authRoute);
router.use('/docs', docRouter);

export default router;
