import jwt from 'jsonwebtoken';

type jwtPayload = {
  userEmail: string;
  role: string;
};
export const createToken = (
  jwtPayload: jwtPayload,
  secret: string,
  expires: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn: expires });
};
