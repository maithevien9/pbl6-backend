import express from 'express';
import { validate } from 'express-validation';

import roleRoute from './role.route';
import authRoute from './auth.route';
import { registerSchema } from '../../validations/auth.validations';

const router = express.Router();

router.use('/roles', roleRoute);
router.use('/auth', [validate(registerSchema)], authRoute);

export default router;
