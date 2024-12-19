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
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You're not authorized!!!🤬🤬",
      );
    }

    const decodedItem = jwt.verify(token, config.jwt_secret as string);
    const { userEmail, role, id } = decodedItem;
    // console.log(decodedItem);
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found!!!');
    }

    if (user.isBlock) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user blocked !!!');
    }

    req.user = decodedItem as JwtPayload;
    req.body.author = id;

    next();
  });
};

export default auth;
