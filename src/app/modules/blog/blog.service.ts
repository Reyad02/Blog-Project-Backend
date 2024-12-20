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
  const content = await Blog.findById(blogId);
  if (loggedInUserId !== content?.author?.toString()) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This is not your content!!!');
  }

  const result = await Blog.findByIdAndUpdate(blogId, payload, { new: true })
    .populate('author')
    .select('_id title content author ');

  return result;
};

const deleteBlog = async (blogId: string, loggedInUser: JwtPayload) => {
  const loggedInUserId = loggedInUser.id;
  const content = await Blog.findById(blogId);
  if (!content) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog post not found');
  }
  if (
    loggedInUserId === content?.author?.toString() ||
    loggedInUser.role === 'admin'
  ) {
    const result = await Blog.findByIdAndDelete(blogId, { new: true })
      .populate('author')
      .select('_id title content author ');
    console.log(result);

    return result;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'This is not your content!!!');
  }
};

export const BlogServices = {
  createBlog,
  updateBlog,
  deleteBlog,
};
