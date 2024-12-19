import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();
router.post(
  '/register',
  validateRequest(UserValidation.userValidation),
  validateRequest(AuthValidation.createUserValidation),
  AuthController.createUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginUserValidation),
  AuthController.loginUser,
);

export const AuthRouter = router;
