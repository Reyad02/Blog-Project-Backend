import httpStatus from 'http-status';
import AppError from '../../errors/AppErros';
import { User } from '../user/user.model';
import { TAuthUser } from './auth.interface';

const createUser = async (payload: TAuthUser) => {
  const user = await User.isUserExist(payload?.email);
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exist!!!😒😒');
  }

  const result = await User.create(payload);
  if (!result) {
    throw Error('Failed to create user!!!😒😒');
  }

  return {
    _id: result._id,
    name: result.name,
    email: result.email,
  };
};

export const AuthServices = {
  createUser,
};
