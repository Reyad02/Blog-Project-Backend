import { z } from 'zod';

const createUserValidation = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(1, 'Name cannot be empty'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email formate'),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const loginUserValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email formate'),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const AuthValidation = {
  createUserValidation,
  loginUserValidation,
};
