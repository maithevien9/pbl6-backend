import express from 'express';
import { CategoryController } from '../../controllers';

const router = express.Router();

router.route('/').get(CategoryController.getAll);

export default router;
