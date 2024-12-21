import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppErros';
import httpStatus from 'http-status';
import config from '../config';
import { User } from '../modules/user/user.model';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken?.split(' ')[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'AUTH_ERROR');
    }

    const decodedItem = jwt.verify(token, config.jwt_secret as string);
    const { userEmail } = decodedItem as JwtPayload;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'AUTH_ERROR');
    }

    if (user.isBlock) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user blocked !!!');
    }

    req.user = decodedItem as JwtPayload;

    next();
  });
};

export default auth;
