import express from 'express';
import { RoleController } from '../../controllers';
// import AuthMiddleware from '../../middlewares/auth.middleware';

const router = express.Router();

router.route('/').get(RoleController.getAll);

export default router;
