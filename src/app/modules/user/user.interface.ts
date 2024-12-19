import { Model } from 'mongoose';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlock: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser>;
}
