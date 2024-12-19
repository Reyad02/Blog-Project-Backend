import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlog(req.body);
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully!!! 😊🎉',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  // console.log(req?.params.id);
  const result = await BlogServices.updateBlog(
    req?.params?.id,
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully!!! 😊🎉',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  updateBlog,
};
