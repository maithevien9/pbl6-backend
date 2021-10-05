import express from 'express';
import { validate } from 'express-validation';

import { AuthController } from '../../controllers';
import {
  registerSchema,
  verifyEmailSchema,
  refreshOtpSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../../validations/auth.validations';

const router = express.Router();

router
  .route('/register')
  .post([validate(registerSchema)], AuthController.register);

router
  .route('/verify-email')
  .post([validate(verifyEmailSchema)], AuthController.verifyEmail);

router
  .route('/refresh-otp')
  .post([validate(refreshOtpSchema)], AuthController.refreshOtp);

router.route('/login').post([validate(loginSchema)], AuthController.login);

router
  .route('/forgot-password')
  .post([validate(forgotPasswordSchema)], AuthController.forgotPassword);

router
  .route('/reset-password')
  .post([validate(resetPasswordSchema)], AuthController.resetPassword);

export default router;
