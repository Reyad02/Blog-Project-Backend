import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  await AdminServices.blockUser(req?.params?.userId, req.user);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'User blocked successfully!!! 😊🎉',
    statusCode: httpStatus.OK,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  await AdminServices.deleteBlog(req?.params?.id, req.user);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Blog deleted successfully!!! 😊🎉',
    statusCode: httpStatus.OK,
  });
});

export const AdminControllers = {
  deleteBlog,
  blockUser,
};
