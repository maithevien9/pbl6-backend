import express from 'express';
import { AuthController } from '../../controllers';

const router = express.Router();

router.route('/register').post(AuthController.register);

export default router;
