import httpStatus from 'http-status';
import AppError from '../../errors/AppErros';
import { Blog } from '../blog/blog.model';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';

const deleteBlog = async (blogId: string, loggedInUser: JwtPayload) => {
  const loggedInUserId = loggedInUser.id;
  const content = await Blog.findById(blogId);

  if (!content) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog post not found');
  }

  const admin = await User.findOne({ role: 'admin' });

  if (
    loggedInUserId !== admin?._id.toString() ||
    loggedInUser.role !== admin?.role
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You are not admin!!!');
  }

  const result = await Blog.findByIdAndDelete(blogId, { new: true })
    .populate('author')
    .select('_id title content author ');

  return result;
};

export const AdminServices = {
  deleteBlog,
};
