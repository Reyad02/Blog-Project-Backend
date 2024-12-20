import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUser(req.body);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully!!! 😊🎉',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    success: true,
    message: 'Login successful!!! 😊🎉',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const AuthController = {
  createUser,
  loginUser
};
