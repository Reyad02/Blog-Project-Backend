import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is important' }),
    content: z.string({ required_error: 'Title is important' }),
    author: z.string().optional(),
    isPublished: z.boolean().default(true),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    author: z.string().optional(),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
