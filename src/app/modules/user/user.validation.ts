import { z } from 'zod';

const userValidation = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(1, 'Name cannot be empty'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email formate'),
    password: z.string({ required_error: 'Password is required' }),
    role: z.enum(['admin', 'user']).default('user'),
    isBlock: z.boolean().default(false),
  }),
});

export const UserValidation = {
  userValidation,
};
