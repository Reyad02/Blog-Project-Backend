import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  console.log(req.user);
  const result = await BlogServices.createBlog(req.body);
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully!!! 😊🎉',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
};
