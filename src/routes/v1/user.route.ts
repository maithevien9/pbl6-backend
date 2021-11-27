import express from 'express';
import { validate } from 'express-validation';

import { UserController } from '../../controllers';
import { AuthMiddleware } from '../../middlewares';
import {
  changePasswordSchema,
  updateInformationSchema,
} from '../../validations/user.validations';

const router = express.Router();

router.route('/me').get([AuthMiddleware.requireAuth], UserController.getMe);
router
  .route('/change-password')
  .put(
    [AuthMiddleware.requireAuth, validate(changePasswordSchema)],
    UserController.changePassword,
  );
router
  .route('/update-information')
  .put(
    [AuthMiddleware.requireAuth, validate(updateInformationSchema)],
    UserController.updateInformation,
  );

export default router;
