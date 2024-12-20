import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlog(req.body, req.user);
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully!!! 😊🎉',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.updateBlog(
    req?.params?.id,
    req.body,
    req.user,
  );
  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully!!! 😊🎉',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.deleteBlog(req?.params?.id, req.user);
  sendResponse(res, {
    success: true,
    message: 'Blog Deleted successfully!!! 😊🎉',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogs(req.query);
  sendResponse(res, {
    success: true,
    message: 'Blog fetched successfully!!! 😊🎉',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs
};
