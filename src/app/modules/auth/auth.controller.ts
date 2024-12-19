import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUser(req.body);
  sendResponse(res, {
    success: true,
    message: 'User created successfully!!! 😊🎉',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

export const AuthController = {
  createUser,
};
