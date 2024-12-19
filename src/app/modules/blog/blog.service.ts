import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (payload: TBlog) => {
  const result = (await Blog.create(payload)).populate('author');

  return result;
};

export const BlogServices = {
  createBlog,
};
