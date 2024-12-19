import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is important' }),
    content: z.string({ required_error: 'Title is important' }),
    author: z.string(),
    isPublished: z.boolean().default(true),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
};
