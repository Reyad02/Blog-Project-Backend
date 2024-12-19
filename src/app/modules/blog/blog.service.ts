import httpStatus from 'http-status';
import AppError from '../../errors/AppErros';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (payload: TBlog) => {
  const createdBlog = await Blog.create(payload);
  const result = await Blog.findById(createdBlog._id)
    .populate('author')
    .select('_id title content author');

  return result;
};

const updateBlog = async (id: string, payload: Partial<TBlog>) => {
  const loggedInUserId = payload.author;
  const contentWriter = await Blog.findById(id);
  if (loggedInUserId !== contentWriter?.author.toString()) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This is not your content!!!');
  }

  const result = await Blog.findByIdAndUpdate(id, payload, { new: true })
    .populate('author')
    .select('_id title content author ');

  return result;
};

export const BlogServices = {
  createBlog,
  updateBlog,
};
