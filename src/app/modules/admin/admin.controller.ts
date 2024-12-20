import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const deleteBlog = catchAsync(async (req, res) => {

  const result = await AdminServices.deleteBlog(req?.params?.id, req.user);
  sendResponse(res, {
    success: true,
    message: 'Blog Deleted successfully!!! 😊🎉',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const AdminControllers = {
  deleteBlog,
};
