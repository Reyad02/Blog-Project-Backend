import { User } from '../user/user.model';
import { TAuthUser } from './auth.interface';

const createUser = async (paylode: TAuthUser) => {
  const user = await User.isUserExist(paylode?.email);

  if (user) {
    throw Error('User already exist');
  }
  const result = await User.create(paylode);

  //   console.log(paylode);
  return result;
};

export const AuthServices = {
  createUser,
};
