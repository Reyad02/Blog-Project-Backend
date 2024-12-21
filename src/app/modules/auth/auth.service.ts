import httpStatus from 'http-status';
import AppError from '../../errors/AppErros';
import { User } from '../user/user.model';
import { TAuthUser } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';
import { Types } from 'mongoose';

const createUser = async (payload: TAuthUser) => {
  const user = await User.isUserExist(payload?.email);
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exist!!!😒😒');
  }

  const result = await User.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user!!!😔😔');
  }

  return {
    _id: result._id,
    name: result.name,
    email: result.email,
  };
};

const loginUser = async (payload: TAuthUser) => {
  const user = await User.isUserExist(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const isUserBlocked = user?.isBlock;
  if (isUserBlocked) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const isPassMatched = await User.isPassMatched(
    payload?.password,
    user?.password,
  );

  if (!isPassMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
    id: (user._id as Types.ObjectId).toString(),
  };

  const token = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_expire_time as string,
  );

  return {
    token,
  };
};

export const AuthServices = {
  createUser,
  loginUser,
};
