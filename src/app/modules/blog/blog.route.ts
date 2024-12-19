import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogControllers } from './blog.controller';

const router = express.Router();
router.post(
  '/',
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog,
);

export const BlogRouter = router;
