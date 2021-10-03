import express from 'express';
import roleRoute from './role.route';

const router = express.Router();

router.use('/roles', roleRoute);

export default router;
