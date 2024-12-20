import httpStatus from 'http-status';
import AppError from '../../errors/AppErros';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { JwtPayload } from 'jsonwebtoken';

const createBlog = async (payload: TBlog, loggedInUser: JwtPayload) => {
  payload.author = loggedInUser.id;
  const createdBlog = await Blog.create(payload);
  const result = await Blog.findById(createdBlog._id)
    .populate('author')
    .select('_id title content author');

  return result;
};

const updateBlog = async (
  blogId: string,
  payload: Partial<TBlog>,
  loggedInUser: JwtPayload,
) => {
  if (loggedInUser.role === 'admin') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You are not allow to update!!!',
    );
  }
  const loggedInUserId = loggedInUser.id;
  const contentWriter = await Blog.findById(blogId);
  if (loggedInUserId !== contentWriter?.author?.toString()) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This is not your content!!!');
  }

  const result = await Blog.findByIdAndUpdate(blogId, payload, { new: true })
    .populate('author')
    .select('_id title content author ');

  return result;
};

export const BlogServices = {
  createBlog,
  updateBlog,
};
