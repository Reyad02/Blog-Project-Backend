/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface TUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlock: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser>;
  isPassMatched(plainPass: string, hashedPass: string): Promise<boolean>;
}
