import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthController } from './auth.controller';

const router = express.Router();
router.post(
  '/register',
  validateRequest(UserValidation.userValidation),
  AuthController.createUser,
);

export const AuthRouter = router;
