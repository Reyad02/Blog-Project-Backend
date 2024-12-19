import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUser(req.body);
//   console.log(result);
  res.send(result);
});

export const AuthController = {
  createUser,
};
