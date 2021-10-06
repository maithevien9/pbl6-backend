import express from 'express';
import { CategoryController } from '../../controllers';
import AuthMiddleware from '../../middlewares/auth.middleware';

const router = express.Router();

router.route('/').get([AuthMiddleware.requireAuth], CategoryController.getAll);

export default router;
